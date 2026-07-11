import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { FaTrash, FaEnvelopeOpen, FaEnvelope, FaSearch, FaSpinner } from 'react-icons/fa'
import { listDocs, updateDocById, deleteDocById } from '../../services/apiService.js'

export default function Messages() {
  const [messages, setMessages] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')

  async function load() {
    setLoading(true)
    try {
      setMessages(await listDocs('messages', 'createdAt'))
    } catch {
      toast.error('Could not load messages.')
    } finally {
      setLoading(false)
    }
  }
  useEffect(() => { load() }, [])

  async function toggleRead(m) {
    await updateDocById('messages', m.id, { read: !m.read })
    load()
  }

  async function handleDelete(m) {
    if (!confirm(`Delete message from "${m.name}"?`)) return
    await deleteDocById('messages', m.id)
    toast.success('Deleted')
    load()
  }

  const filtered = messages.filter(
    (m) => m.name?.toLowerCase().includes(search.toLowerCase()) || m.email?.toLowerCase().includes(search.toLowerCase()),
  )

  return (
    <div>
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="font-heading text-2xl text-mist">Messages</h1>
        <div className="relative w-full sm:max-w-xs">
          <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-ash" />
          <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search by name or email…" className="input-field !pl-11" />
        </div>
      </div>

      {loading ? (
        <div className="flex items-center gap-2 p-12 text-ash"><FaSpinner className="animate-spin" /> Loading…</div>
      ) : filtered.length === 0 ? (
        <p className="glass-panel p-12 text-center text-ash">No messages yet.</p>
      ) : (
        <div className="space-y-3">
          {filtered.map((m) => (
            <div key={m.id} className={`glass-panel flex flex-col gap-3 p-5 sm:flex-row sm:items-start sm:justify-between ${!m.read ? 'border-blood/40' : ''}`}>
              <div>
                <div className="flex items-center gap-2">
                  <p className="font-heading text-sm text-mist">{m.name}</p>
                  {!m.read && <span className="rounded-full bg-blood px-2 py-0.5 text-[10px] text-white">NEW</span>}
                </div>
                <p className="text-xs text-ash">{m.email} {m.subject && `• ${m.subject}`}</p>
                <p className="mt-2 max-w-xl text-sm text-mist">{m.message}</p>
              </div>
              <div className="flex gap-3 self-end sm:self-start">
                <button onClick={() => toggleRead(m)} className="text-ash hover:text-mist focus-ring" title={m.read ? 'Mark unread' : 'Mark read'}>
                  {m.read ? <FaEnvelopeOpen /> : <FaEnvelope />}
                </button>
                <button onClick={() => handleDelete(m)} className="text-ash hover:text-blood focus-ring"><FaTrash /></button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
