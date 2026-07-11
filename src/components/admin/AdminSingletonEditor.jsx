import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { FaSpinner } from 'react-icons/fa'
import { getSingleton, setSingleton, uploadFile } from '../../services/apiService.js'

export default function AdminSingletonEditor({ collectionName, docId, title, fields, defaults }) {
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(null)
  const { register, handleSubmit, reset } = useForm({ defaultValues: defaults })

  useEffect(() => {
    (async () => {
      try {
        const data = await getSingleton(collectionName, docId)
        reset(data || defaults)
      } catch {
        reset(defaults)
      } finally {
        setLoading(false)
      }
    })()
  }, [collectionName, docId])

  async function onSubmit(values) {
    setSaving(true)
    try {
      const payload = { ...values }
      for (const f of fields) {
        if (f.type === 'file' && values[f.name] instanceof FileList && values[f.name].length > 0) {
          const file = values[f.name][0]
          const url = await uploadFile(`site/${docId}/${Date.now()}_${file.name}`, file, setUploadProgress)
          payload[f.name] = url
        } else if (f.type === 'file') {
          delete payload[f.name] // keep existing stored value (merge:true preserves it)
        }
      }
      await setSingleton(collectionName, docId, payload)
      toast.success('Saved — live on the site now')
      setUploadProgress(null)
    } catch (err) {
      toast.error(err.message || 'Save failed')
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return <div className="flex items-center gap-2 p-12 text-ash"><FaSpinner className="animate-spin" /> Loading…</div>
  }

  return (
    <div>
      <h1 className="mb-6 font-heading text-2xl text-mist">{title}</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="glass-panel space-y-5 p-6">
        {fields.map((f) => (
          <div key={f.name}>
            <label className="mb-1.5 block text-xs uppercase tracking-wide text-ash">{f.label}</label>
            {f.type === 'textarea' && <textarea rows={f.rows || 4} className="input-field" {...register(f.name)} />}
            {f.type === 'file' && (
              <>
                <input type="file" accept={f.accept || 'image/*,video/*'} className="input-field" {...register(f.name)} />
                {uploadProgress !== null && <p className="mt-1 text-xs text-ash">Uploading: {uploadProgress}%</p>}
              </>
            )}
            {['text', 'url', 'email', 'tel'].includes(f.type) && (
              <input type={f.type} className="input-field" {...register(f.name)} />
            )}
            {f.hint && <p className="mt-1 text-xs text-ash/70">{f.hint}</p>}
          </div>
        ))}
        <button type="submit" disabled={saving} className="btn-primary !px-6 !py-3 text-xs disabled:opacity-50">
          {saving ? 'Saving…' : 'Save Changes'}
        </button>
      </form>
    </div>
  )
}
