import { apiFetch, getAuthToken, API_URL } from './apiClient.js'

/** Fetch every item in a collection, newest first (public, no auth needed). */
export async function listDocs(colName) {
  return apiFetch(`/api/items/${colName}`)
}

/**
 * "Live" subscription — the backend is plain REST, so this polls every 8s
 * instead of a true real-time stream. Good enough for admin dashboard counts.
 * Returns an unsubscribe function, same contract as the old Firestore version.
 */
export function subscribeToCollection(colName, cb) {
  let cancelled = false
  async function poll() {
    try {
      const data = await listDocs(colName)
      if (!cancelled) cb(data)
    } catch {
      // Silently ignore poll failures — the dashboard just keeps its last count.
    }
  }
  poll()
  const interval = setInterval(poll, 8000)
  return () => {
    cancelled = true
    clearInterval(interval)
  }
}

export async function createDoc(colName, data) {
  return apiFetch(`/api/items/${colName}`, { method: 'POST', body: JSON.stringify(data) })
}

export async function updateDocById(colName, id, data) {
  return apiFetch(`/api/items/${colName}/${id}`, { method: 'PUT', body: JSON.stringify(data) })
}

export async function deleteDocById(colName, id) {
  return apiFetch(`/api/items/${colName}/${id}`, { method: 'DELETE' })
}

/** Singleton documents (hero, about, contact, settings). `colName` is kept
 * for call-site compatibility but ignored — the backend keys purely by docId. */
export async function getSingleton(colName, docId) {
  return apiFetch(`/api/content/${docId}`)
}

export async function setSingleton(colName, docId, data) {
  return apiFetch(`/api/content/${docId}`, { method: 'PUT', body: JSON.stringify(data) })
}

/** Upload a File to the backend with progress callback; resolves to the public URL. */
export function uploadFile(_path, file, onProgress) {
  return new Promise((resolve, reject) => {
    const formData = new FormData()
    formData.append('file', file)

    const xhr = new XMLHttpRequest()
    xhr.open('POST', `${API_URL}/api/upload`)
    const token = getAuthToken()
    if (token) xhr.setRequestHeader('Authorization', `Bearer ${token}`)

    xhr.upload.onprogress = (e) => {
      if (onProgress && e.lengthComputable) onProgress(Math.round((e.loaded / e.total) * 100))
    }
    xhr.onload = () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        try {
          resolve(JSON.parse(xhr.responseText).url)
        } catch {
          reject(new Error('Upload failed — unexpected server response.'))
        }
      } else {
        reject(new Error('Upload failed.'))
      }
    }
    xhr.onerror = () => reject(new Error('Upload failed — check your connection.'))
    xhr.send(formData)
  })
}

/** Deleting the physical file on disk isn't wired up yet — removing the
 * database reference (handled by the caller) is enough for the UI to work. */
export async function deleteFileByUrl() {}
