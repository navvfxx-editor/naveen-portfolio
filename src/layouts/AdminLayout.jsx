import { useState } from 'react'
import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import {
  FaTachometerAlt, FaImages, FaHome, FaUserAlt, FaConciergeBell,
  FaCommentDots, FaQuestionCircle, FaEnvelopeOpenText, FaCog,
  FaSignOutAlt, FaBars, FaTimes,
} from 'react-icons/fa'
import { toast } from 'react-toastify'
import { useAuth } from '../context/AuthContext.jsx'

const NAV = [
  { to: '/admin', label: 'Dashboard', icon: FaTachometerAlt, end: true },
  { to: '/admin/home', label: 'Home Page', icon: FaHome },
  { to: '/admin/about', label: 'About', icon: FaUserAlt },
  { to: '/admin/services', label: 'Services', icon: FaConciergeBell },
  { to: '/admin/portfolio', label: 'Portfolio', icon: FaImages },
  { to: '/admin/testimonials', label: 'Testimonials', icon: FaCommentDots },
  { to: '/admin/faq', label: 'FAQ', icon: FaQuestionCircle },
  { to: '/admin/contact', label: 'Contact Info', icon: FaEnvelopeOpenText },
  { to: '/admin/messages', label: 'Messages', icon: FaEnvelopeOpenText },
  { to: '/admin/settings', label: 'Settings', icon: FaCog },
]

export default function AdminLayout() {
  const { logout, user } = useAuth()
  const [open, setOpen] = useState(false)
  const navigate = useNavigate()

  async function handleLogout() {
    await logout()
    toast.success('Logged out')
    navigate('/admin/login')
  }

  return (
    <div className="admin-shell flex">
      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-40 w-64 transform border-r border-white/10 bg-charcoal transition-transform duration-300 lg:static lg:translate-x-0 ${
          open ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between border-b border-white/10 px-5 py-5">
          <p className="font-display text-xl tracking-widest text-mist">ADMIN<span className="text-blood">.</span></p>
          <button className="text-mist lg:hidden" onClick={() => setOpen(false)}><FaTimes /></button>
        </div>
        <nav className="flex flex-col gap-1 overflow-y-auto px-3 py-4" style={{ maxHeight: 'calc(100vh - 140px)' }}>
          {NAV.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              onClick={() => setOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-xl px-4 py-3 text-sm transition-colors focus-ring ${
                  isActive ? 'bg-blood text-white' : 'text-ash hover:bg-white/[0.05] hover:text-mist'
                }`
              }
            >
              <item.icon className="text-base" /> {item.label}
            </NavLink>
          ))}
        </nav>
        <div className="absolute bottom-0 left-0 right-0 border-t border-white/10 p-4">
          <p className="mb-2 truncate text-xs text-ash">{user?.email}</p>
          <button onClick={handleLogout} className="btn-outline w-full !py-2 text-xs">
            <FaSignOutAlt /> Logout
          </button>
        </div>
      </aside>

      {/* Main */}
      <div className="flex min-h-screen flex-1 flex-col">
        <header className="flex items-center justify-between border-b border-white/10 bg-charcoal/60 px-5 py-4 lg:hidden">
          <button className="text-xl text-mist" onClick={() => setOpen(true)}><FaBars /></button>
          <p className="font-display tracking-widest text-mist">ADMIN</p>
          <div className="w-6" />
        </header>
        <main className="flex-1 p-5 sm:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
