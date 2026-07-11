import { useEffect, useState } from 'react'
import { FaImages, FaCommentDots, FaEnvelopeOpenText, FaConciergeBell, FaChartLine } from 'react-icons/fa'
import { subscribeToCollection } from '../../services/apiService.js'

function Card({ icon: Icon, label, value }) {
  return (
    <div className="glass-panel flex items-center gap-4 p-6">
      <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-blood/15 text-xl text-blood"><Icon /></span>
      <div>
        <p className="font-display text-3xl text-mist">{value}</p>
        <p className="text-xs uppercase tracking-wide text-ash">{label}</p>
      </div>
    </div>
  )
}

export default function Dashboard() {
  const [counts, setCounts] = useState({ portfolio: 0, testimonials: 0, messages: 0, services: 0 })

  useEffect(() => {
    const unsubs = [
      subscribeToCollection('portfolio', (d) => setCounts((c) => ({ ...c, portfolio: d.length })), 'createdAt'),
      subscribeToCollection('testimonials', (d) => setCounts((c) => ({ ...c, testimonials: d.length })), 'createdAt'),
      subscribeToCollection('messages', (d) => setCounts((c) => ({ ...c, messages: d.length })), 'createdAt'),
      subscribeToCollection('services', (d) => setCounts((c) => ({ ...c, services: d.length })), 'createdAt'),
    ]
    return () => unsubs.forEach((u) => u())
  }, [])

  return (
    <div>
      <h1 className="mb-2 font-heading text-2xl text-mist">Welcome back, Naveen</h1>
      <p className="mb-8 text-sm text-ash">Here's what's happening on your site right now.</p>
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        <Card icon={FaImages} label="Total Projects" value={counts.portfolio} />
        <Card icon={FaConciergeBell} label="Total Services" value={counts.services} />
        <Card icon={FaCommentDots} label="Total Testimonials" value={counts.testimonials} />
        <Card icon={FaEnvelopeOpenText} label="Total Messages" value={counts.messages} />
        <Card icon={FaChartLine} label="Visitors" value="—" />
      </div>
      <p className="mt-6 text-xs text-ash">
        Tip: visitor analytics connect through Google Analytics — add your Measurement ID in Settings.
      </p>
    </div>
  )
}
