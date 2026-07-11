import { Outlet } from 'react-router-dom'
import Navbar from '../components/Navbar.jsx'
import Footer from '../components/Footer.jsx'
import ScrollProgress from '../components/ScrollProgress.jsx'
import CursorFollower from '../components/CursorFollower.jsx'
import ScrollToTop from '../components/ScrollToTop.jsx'

export default function PublicLayout() {
  return (
    <div className="relative min-h-screen bg-obsidian">
      <div className="grain-overlay bg-grain" />
      <ScrollProgress />
      <CursorFollower />
      <ScrollToTop />
      <Navbar />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
