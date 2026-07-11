import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FaChevronDown } from 'react-icons/fa'
import { useSiteData } from '../context/SiteDataContext.jsx'

export default function FAQ() {
  const { faqs } = useSiteData()
  const [open, setOpen] = useState(null)

  return (
    <div className="section max-w-2xl pt-32">
      <div className="mb-12 text-center">
        <p className="eyebrow justify-center">FAQ</p>
        <h1 className="h2">Common Questions</h1>
      </div>
      <div className="space-y-3">
        {faqs.map((f, i) => (
          <div key={f.id} className="overflow-hidden rounded-xl border border-white/10 bg-white/[0.03]">
            <button
              onClick={() => setOpen(open === i ? null : i)}
              className="flex w-full items-center justify-between px-5 py-4 text-left focus-ring"
            >
              <span className="font-heading text-sm text-mist">{f.question}</span>
              <motion.span animate={{ rotate: open === i ? 180 : 0 }} className="text-blood"><FaChevronDown /></motion.span>
            </button>
            <AnimatePresence>
              {open === i && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="overflow-hidden"
                >
                  <p className="px-5 pb-5 text-sm text-ash">{f.answer}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </div>
  )
}
