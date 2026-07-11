import { motion } from 'framer-motion'
import * as FaIcons from 'react-icons/fa'

export default function ServiceCard({ service, index }) {
  const Icon = FaIcons[service.icon] || FaIcons.FaFilm

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: (index % 4) * 0.08 }}
      whileHover={{ y: -8 }}
      className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] p-7 backdrop-blur-md transition-colors duration-300 hover:border-blood/50"
    >
      <div className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-blood/0 blur-2xl transition-all duration-500 group-hover:bg-blood/20" />
      <span className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-blood/10 text-2xl text-blood transition-colors group-hover:bg-blood group-hover:text-white">
        <Icon />
      </span>
      <h3 className="font-heading text-base text-mist">{service.name}</h3>
      <p className="mt-2 text-sm text-ash">{service.description}</p>
    </motion.div>
  )
}
