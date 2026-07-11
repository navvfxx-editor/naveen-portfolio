import { FaWhatsapp, FaInstagram, FaEnvelope } from 'react-icons/fa'
import { motion } from 'framer-motion'
import { useSiteData } from '../context/SiteDataContext.jsx'

function IconButton({ href, label, sub, Icon, colorClass, delay }) {
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ y: -6 }}
      className="group relative flex w-full flex-col items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.03] px-6 py-8 text-center backdrop-blur-md transition-colors duration-300 hover:border-blood/60 focus-ring sm:w-56"
    >
      <span
        className={`flex h-16 w-16 items-center justify-center rounded-full text-3xl text-white shadow-premium transition-transform duration-300 group-hover:scale-110 ${colorClass}`}
      >
        <Icon />
      </span>
      <span className="pointer-events-none absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-charcoal px-3 py-1 text-xs font-medium text-mist opacity-0 shadow-premium transition-all duration-300 group-hover:-top-4 group-hover:opacity-100">
        {label}
      </span>
      <div>
        <p className="font-heading text-sm tracking-wide text-mist">{label}</p>
        <p className="mt-1 text-xs text-ash">{sub}</p>
      </div>
    </motion.a>
  )
}

export default function ContactIcons() {
  const { contact } = useSiteData()

  const waLink = `https://wa.me/${contact.whatsappNumber}`
  const igLink = contact.instagramUrl
  const mailLink = `mailto:${contact.email}`

  return (
    <div className="flex flex-col items-center gap-6 sm:flex-row sm:justify-center">
      <IconButton
        href={waLink}
        label={contact.ownerName}
        sub={contact.phone}
        Icon={FaWhatsapp}
        colorClass="bg-[#25D366]"
        delay={0}
      />
      <IconButton
        href={igLink}
        label={contact.ownerName}
        sub={contact.instagramHandle}
        Icon={FaInstagram}
        colorClass="bg-gradient-to-tr from-[#f58529] via-[#dd2a7b] to-[#8134af]"
        delay={0.1}
      />
      <IconButton
        href={mailLink}
        label={contact.ownerName}
        sub={contact.email}
        Icon={FaEnvelope}
        colorClass="bg-blood"
        delay={0.2}
      />
    </div>
  )
}
