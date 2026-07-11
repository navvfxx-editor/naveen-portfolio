const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000'

let authToken = typeof localStorage !== 'undefined' ? localStorage.getItem('authToken') : null

export function setAuthToken(token) {
  authToken = token
  if (typeof localStorage === 'undefined') return
  if (token) localStorage.setItem('authToken', token)
  else localStorage.removeItem('authToken')
}

export function getAuthToken() {
  return authToken
}

export async function apiFetch(path, options = {}) {
  const headers = { ...(options.headers || {}) }
  if (!(options.body instanceof FormData) && options.body) {
    headers['Content-Type'] = 'application/json'
  }
  if (authToken) headers['Authorization'] = `Bearer ${authToken}`

  const res = await fetch(`${API_URL}${path}`, { ...options, headers })

  if (!res.ok) {
    let message = `Request failed (${res.status})`
    try {
      const data = await res.json()
      if (data.error) message = data.error
    } catch {
      // response wasn't JSON — keep the generic message
    }
    throw new Error(message)
  }

  if (res.status === 204) return null
  return res.json()
}

export { API_URL }
