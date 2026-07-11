import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { FaPlus, FaEdit, FaTrash, FaTimes, FaSpinner } from 'react-icons/fa'
import {
  listDocs, createDoc, updateDocById, deleteDocById, uploadFile, deleteFileByUrl,
} from '../../services/apiService.js'

/**
 * fields: [{ name, label, type: 'text'|'textarea'|'number'|'select'|'checkbox'|'file'|'url', options?, required? }]
 */
export default function AdminCollectionManager({ collectionName, title, fields, columns, storageFolder }) {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [modalOpen, setModalOpen] = useState(false)
  const [editing, setEditing] = useState(null)
  const [saving, setSaving] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(null)
  const { register, handleSubmit, reset, formState: { errors } } = useForm()

  async function load() {
    setLoading(true)
    try {
      const data = await listDocs(collectionName, 'createdAt')
      setItems(data)
    } catch (err) {
      toast.error('Could not load data — check that the API server is running.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { load() }, [collectionName])

  function openAdd() {
    setEditing(null)
    reset({})
    setModalOpen(true)
  }

  function openEdit(item) {
    setEditing(item)
    reset(item)
    setModalOpen(true)
  }

  async function onSubmit(values) {
    setSaving(true)
    try {
      const payload = { ...values }
      for (const f of fields) {
        if (f.type === 'file' && values[f.name] instanceof FileList && values[f.name].length > 0) {
          const file = values[f.name][0]
          const path = `${storageFolder}/${Date.now()}_${file.name}`
          const url = await uploadFile(path, file, setUploadProgress)
          payload[f.name] = url
        } else if (f.type === 'file') {
          payload[f.name] = editing?.[f.name] || ''
        }
        if (f.type === 'number') payload[f.name] = Number(values[f.name] || 0)
        if (f.type === 'checkbox') payload[f.name] = !!values[f.name]
      }

      if (editing) {
        await updateDocById(collectionName, editing.id, payload)
        toast.success('Updated successfully')
      } else {
        await createDoc(collectionName, payload)
        toast.success('Added successfully')
      }
      setModalOpen(false)
      setUploadProgress(null)
      load()
    } catch (err) {
      toast.error(err.message || 'Something went wrong')
    } finally {
      setSaving(false)
    }
  }

  async function handleDelete(item) {
    if (!confirm(`Delete "${item[columns[0]] || item.id}"? This cannot be undone.`)) return
    try {
      for (const f of fields) {
        if (f.type === 'file' && item[f.name]) await deleteFileByUrl(item[f.name])
      }
      await deleteDocById(collectionName, item.id)
      toast.success('Deleted')
      load()
    } catch {
      toast.error('Delete failed')
    }
  }

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="font-heading text-2xl text-mist">{title}</h1>
        <button onClick={openAdd} className="btn-primary !px-5 !py-2.5 text-xs">
          <FaPlus /> Add {title.replace(/s$/, '')}
        </button>
      </div>

      <div className="glass-panel overflow-x-auto">
        {loading ? (
          <div className="flex items-center justify-center gap-2 p-12 text-ash"><FaSpinner className="animate-spin" /> Loading…</div>
        ) : items.length === 0 ? (
          <p className="p-12 text-center text-ash">Nothing here yet. Click "Add {title.replace(/s$/, '')}" to create the first one.</p>
        ) : (
          <table className="w-full min-w-[600px] text-left text-sm">
            <thead className="border-b border-white/10 text-ash">
              <tr>
                {columns.map((c) => <th key={c} className="px-5 py-3 font-medium capitalize">{c}</th>)}
                <th className="px-5 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr key={item.id} className="border-b border-white/5 text-mist hover:bg-white/[0.02]">
                  {columns.map((c) => (
                    <td key={c} className="max-w-xs truncate px-5 py-3">{String(item[c] ?? '')}</td>
                  ))}
                  <td className="px-5 py-3 text-right">
                    <button onClick={() => openEdit(item)} className="mr-3 text-ash transition-colors hover:text-mist focus-ring"><FaEdit /></button>
                    <button onClick={() => handleDelete(item)} className="text-ash transition-colors hover:text-blood focus-ring"><FaTrash /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm">
          <div className="glass-panel max-h-[90vh] w-full max-w-lg overflow-y-auto p-6">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="font-heading text-lg text-mist">{editing ? 'Edit' : 'Add'} {title.replace(/s$/, '')}</h2>
              <button onClick={() => setModalOpen(false)} className="text-ash hover:text-mist focus-ring"><FaTimes /></button>
            </div>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              {fields.map((f) => (
                <div key={f.name}>
                  <label className="mb-1.5 block text-xs uppercase tracking-wide text-ash">{f.label}</label>
                  {f.type === 'textarea' && (
                    <textarea rows={4} className="input-field" {...register(f.name, { required: f.required })} />
                  )}
                  {f.type === 'select' && (
                    <select className="input-field" {...register(f.name, { required: f.required })}>
                      {f.options.map((o) => <option key={o} value={o}>{o}</option>)}
                    </select>
                  )}
                  {f.type === 'checkbox' && (
                    <input type="checkbox" className="h-5 w-5 accent-blood" {...register(f.name)} />
                  )}
                  {f.type === 'file' && (
                    <>
                      <input type="file" accept={f.accept || 'image/*,video/*'} className="input-field" {...register(f.name)} />
                      {uploadProgress !== null && <p className="mt-1 text-xs text-ash">Uploading: {uploadProgress}%</p>}
                      {editing?.[f.name] && <p className="mt-1 truncate text-xs text-ash">Current: {editing[f.name]}</p>}
                    </>
                  )}
                  {['text', 'number', 'url'].includes(f.type) && (
                    <input type={f.type === 'url' ? 'url' : f.type} className="input-field" {...register(f.name, { required: f.required })} />
                  )}
                  {errors[f.name] && <p className="mt-1 text-xs text-blood">This field is required.</p>}
                </div>
              ))}
              <div className="flex justify-end gap-3 pt-2">
                <button type="button" onClick={() => setModalOpen(false)} className="btn-outline !px-5 !py-2.5 text-xs">Cancel</button>
                <button type="submit" disabled={saving} className="btn-primary !px-5 !py-2.5 text-xs disabled:opacity-50">
                  {saving ? 'Saving…' : 'Save'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
