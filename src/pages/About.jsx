import { motion } from 'framer-motion'
import { FaDownload } from 'react-icons/fa'
import { useSiteData } from '../context/SiteDataContext.jsx'

export default function About() {
  const { about } = useSiteData()

  return (
    <div className="section pt-32">
      <div className="grid grid-cols-1 items-center gap-14 lg:grid-cols-2">
        <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
          <div className="relative aspect-[4/5] overflow-hidden rounded-2xl border border-white/10 shadow-premium">
            {about.photoUrl ? (
              <img src={about.photoUrl} alt="Naveen" className="h-full w-full object-cover" />
            ) : (
              <div className="flex h-full w-full items-center justify-center bg-graphite">
                <span className="font-display text-6xl text-ash/40">NAVEEN</span>
              </div>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-obsidian/70 to-transparent" />
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
          <p className="eyebrow">About</p>
          <h1 className="h2">The Editor Behind The Cut</h1>
          <p className="body-muted mt-6 leading-relaxed">{about.story}</p>
          <p className="mt-4 rounded-xl border-l-2 border-blood bg-white/[0.03] p-4 text-sm italic text-mist">{about.mission}</p>
          {about.resumeUrl && (
            <a href={about.resumeUrl} download className="btn-primary mt-8 inline-flex"><FaDownload /> Download Resume</a>
          )}
        </motion.div>
      </div>

      {/* SKILLS */}
      <div className="mt-24">
        <h2 className="h2 mb-10 text-center">Skills</h2>
        <div className="mx-auto max-w-2xl space-y-6">
          {about.skills.map((s, i) => (
            <div key={s.name}>
              <div className="mb-2 flex justify-between text-sm">
                <span className="text-mist">{s.name}</span>
                <span className="text-ash">{s.level}%</span>
              </div>
              <div className="h-2 overflow-hidden rounded-full bg-white/10">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: `${s.level}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, delay: i * 0.1, ease: 'easeOut' }}
                  className="h-full rounded-full bg-gradient-to-r from-blood to-ember"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  )
}
