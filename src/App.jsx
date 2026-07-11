import { useEffect, useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import Loader from './components/Loader.jsx'
import ProtectedRoute from './routes/ProtectedRoute.jsx'
import PublicLayout from './layouts/PublicLayout.jsx'
import AdminLayout from './layouts/AdminLayout.jsx'

import Home from './pages/Home.jsx'
import About from './pages/About.jsx'
import Services from './pages/Services.jsx'
import Portfolio from './pages/Portfolio.jsx'
import FAQ from './pages/FAQ.jsx'
import Contact from './pages/Contact.jsx'
import NotFound from './pages/NotFound.jsx'

import Login from './pages/admin/Login.jsx'
import Dashboard from './pages/admin/Dashboard.jsx'
import HomeManage from './pages/admin/HomeManage.jsx'
import AboutManage from './pages/admin/AboutManage.jsx'
import ServicesManage from './pages/admin/ServicesManage.jsx'
import PortfolioManage from './pages/admin/PortfolioManage.jsx'
import TestimonialsManage from './pages/admin/TestimonialsManage.jsx'
import FaqManage from './pages/admin/FaqManage.jsx'
import ContactManage from './pages/admin/ContactManage.jsx'
import Messages from './pages/admin/Messages.jsx'
import Settings from './pages/admin/Settings.jsx'

export default function App() {
  const [showLoader, setShowLoader] = useState(true)

  useEffect(() => {
    const t = setTimeout(() => setShowLoader(false), 1400)
    return () => clearTimeout(t)
  }, [])

  return (
    <>
      <Loader show={showLoader} />
      <ToastContainer theme="dark" position="bottom-right" toastClassName="!bg-charcoal !text-mist" />
      <Routes>
        {/* Public site */}
        <Route element={<PublicLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Route>

        {/* Admin — owner only, no signup */}
        <Route path="/admin/login" element={<Login />} />
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Dashboard />} />
          <Route path="home" element={<HomeManage />} />
          <Route path="about" element={<AboutManage />} />
          <Route path="services" element={<ServicesManage />} />
          <Route path="portfolio" element={<PortfolioManage />} />
          <Route path="testimonials" element={<TestimonialsManage />} />
          <Route path="faq" element={<FaqManage />} />
          <Route path="contact" element={<ContactManage />} />
          <Route path="messages" element={<Messages />} />
          <Route path="settings" element={<Settings />} />
        </Route>
      </Routes>
    </>
  )
}
