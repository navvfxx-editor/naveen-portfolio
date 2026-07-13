import { Link } from 'react-router-dom'
import { FaWhatsapp, FaInstagram, FaEnvelope, FaYoutube, FaLinkedin, FaArrowUp, FaUserShield } from 'react-icons/fa'
import { useSiteData } from '../context/SiteDataContext.jsx'
import { useAuth } from '../context/AuthContext.jsx'

export default function Footer() {
  const { settings, contact } = useSiteData()
  const { isOwner } = useAuth()

  function scrollTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer className="relative border-t border-white/10 bg-charcoal/60">
      <div className="section grid grid-cols-1 gap-12 !py-16 sm:grid-cols-2">
        <div>
          <p className="mb-4 font-heading text-sm tracking-wide text-mist">Quick Links</p>
          <ul className="space-y-2 text-sm text-ash">
            {['Home', 'About', 'Services', 'Portfolio', 'Contact'].map((l) => (
              <li key={l}>
                <Link to={l === 'Home' ? '/' : `/${l.toLowerCase()}`} className="transition-colors hover:text-blood">{l}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="mb-4 font-heading text-sm tracking-wide text-mist">Connect</p>
          <div className="flex gap-4 text-xl text-ash">
            <a href={`https://wa.me/${contact.whatsappNumber}`} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp" className="transition-colors hover:text-blood focus-ring"><FaWhatsapp /></a>
            <a href={contact.instagramUrl} target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="transition-colors hover:text-blood focus-ring"><FaInstagram /></a>
            <a href={`mailto:${contact.email}`} aria-label="Email" className="transition-colors hover:text-blood focus-ring"><FaEnvelope /></a>
            {contact.youtubeUrl && (
              <a href={contact.youtubeUrl} target="_blank" rel="noopener noreferrer" aria-label="YouTube" className="transition-colors hover:text-blood focus-ring"><FaYoutube /></a>
            )}
            {contact.linkedinUrl && (
              <a href={contact.linkedinUrl} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="transition-colors hover:text-blood focus-ring"><FaLinkedin /></a>
            )}
          </div>
        </div>
      </div>

      <div className="flex flex-col items-center justify-between gap-4 border-t border-white/10 px-5 py-6 text-xs text-ash sm:flex-row sm:px-16">
        <div className="flex items-center gap-3">
          <p>{settings.footerText}</p>
          <Link
            to={isOwner ? '/admin' : '/admin/login'}
            title={isOwner ? 'Open Admin Dashboard' : 'Admin Login'}
            aria-label="Admin"
            className="flex h-6 w-6 items-center justify-center rounded-full text-ash/50 transition-colors hover:text-blood focus-ring"
          >
            <FaUserShield className="text-xs" />
          </Link>
        </div>
        <button onClick={scrollTop} className="flex items-center gap-2 rounded-full border border-white/10 px-4 py-2 transition-colors hover:border-blood focus-ring">
          Back to top <FaArrowUp />
        </button>
      </div>
    </footer>
  )
}
