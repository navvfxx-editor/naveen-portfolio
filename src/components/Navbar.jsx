import { useEffect, useState } from 'react'
import { NavLink, Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { FaBars, FaTimes } from 'react-icons/fa'
import { useSiteData } from '../context/SiteDataContext.jsx'

const LINKS = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About' },
  { to: '/services', label: 'Services' },
  { to: '/portfolio', label: 'Portfolio' },
  { to: '/contact', label: 'Contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const { settings } = useSiteData()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled ? 'glass border-b border-white/10 py-3' : 'bg-transparent py-6'
      }`}
    >
      <nav className="mx-auto flex w-full max-w-[1440px] items-center justify-between px-5 sm:px-8 lg:px-16">
        <Link to="/" className="font-display text-2xl tracking-widest text-mist focus-ring">
          {settings.siteName}
          <span className="text-blood">.</span>
        </Link>

        <ul className="hidden items-center gap-8 lg:flex">
          {LINKS.map((l) => (
            <li key={l.to}>
              <NavLink
                to={l.to}
                className={({ isActive }) =>
                  `relative font-body text-sm tracking-wide transition-colors focus-ring ${
                    isActive ? 'text-mist' : 'text-ash hover:text-mist'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    {l.label}
                    {isActive && (
                      <motion.span layoutId="nav-underline" className="absolute -bottom-1.5 left-0 h-[2px] w-full bg-blood" />
                    )}
                  </>
                )}
              </NavLink>
            </li>
          ))}
        </ul>

        <Link to="/contact" className="btn-primary hidden lg:inline-flex">Hire Me</Link>

        <button
          className="text-2xl text-mist focus-ring lg:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          {open ? <FaTimes /> : <FaBars />}
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden glass border-t border-white/10 lg:hidden"
          >
            <ul className="flex flex-col gap-1 px-5 py-4">
              {LINKS.map((l) => (
                <li key={l.to}>
                  <NavLink
                    to={l.to}
                    onClick={() => setOpen(false)}
                    className={({ isActive }) =>
                      `block rounded-lg px-3 py-3 text-sm ${isActive ? 'bg-blood/10 text-mist' : 'text-ash'}`
                    }
                  >
                    {l.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
