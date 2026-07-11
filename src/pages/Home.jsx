import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { FaPlay, FaArrowRight } from 'react-icons/fa'
import { useSiteData } from '../context/SiteDataContext.jsx'
import ServiceCard from '../components/ServiceCard.jsx'
import TestimonialSlider from '../components/TestimonialSlider.jsx'
import VideoGallery from '../components/VideoGallery.jsx'

export default function Home() {
  const { hero, services } = useSiteData()

  return (
    <div>
      {/* HERO */}
      <section className="relative flex min-h-screen items-center overflow-hidden bg-obsidian">
        {hero.bgVideoUrl ? (
          <video
            autoPlay muted loop playsInline
            className="absolute inset-0 h-full w-full object-cover opacity-40"
            src={hero.bgVideoUrl}
          />
        ) : (
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,rgba(139,20,225,0.15),transparent_55%)]" />
        )}
        <div className="absolute inset-0 bg-gradient-to-b from-obsidian/60 via-obsidian/70 to-obsidian" />

        <div className="section relative z-10 flex flex-col items-center text-center">
          <motion.p initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="eyebrow">
            {hero.subtitle}
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-display text-[18vw] leading-[0.9] tracking-wide text-mist sm:text-[12vw] lg:text-[9vw]"
          >
            {hero.title}<span className="text-blood">.</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-6 max-w-xl text-base text-ash sm:text-lg"
          >
            {hero.description}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.55 }}
            className="mt-10 flex flex-col gap-4 sm:flex-row"
          >
            <Link to="/contact" className="btn-primary">{hero.primaryBtnText} <FaArrowRight /></Link>
            <Link to="/portfolio" className="btn-outline"><FaPlay /> View Work</Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="mt-20 grid w-full max-w-3xl grid-cols-2 gap-8 sm:grid-cols-4"
          >
            {hero.stats.map((s) => (
              <div key={s.label}>
                <p className="font-display text-3xl text-mist sm:text-4xl">{s.value}</p>
                <p className="mt-1 text-xs uppercase tracking-widest text-ash">{s.label}</p>
              </div>
            ))}
          </motion.div>
        </div>

        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 text-ash"
        >
          <div className="h-10 w-6 rounded-full border border-white/20 p-1">
            <div className="h-2 w-1 rounded-full bg-blood" />
          </div>
        </motion.div>
      </section>

      {/* SERVICES PREVIEW */}
      <section className="section">
        <div className="mb-14 text-center">
          <p className="eyebrow justify-center">What I Do</p>
          <h2 className="h2">Services Built For Impact</h2>
        </div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {services.slice(0, 8).map((s, i) => <ServiceCard key={s.id} service={s} index={i} />)}
        </div>
        <div className="mt-12 text-center">
          <Link to="/services" className="btn-outline">View All Services <FaArrowRight /></Link>
        </div>
      </section>

      {/* PORTFOLIO / VIDEO TOGGLE */}
      <section className="section">
        <div className="mb-14 text-center">
          <p className="eyebrow justify-center">Recent Work</p>
          <h2 className="h2">Short Form & Long Form Cuts</h2>
        </div>
        <VideoGallery showTitle={false} />
        <div className="mt-12 text-center">
          <Link to="/portfolio" className="btn-outline">Full Portfolio <FaArrowRight /></Link>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="section">
        <div className="mb-14 text-center">
          <p className="eyebrow justify-center">Testimonials</p>
          <h2 className="h2">Clients On The Record</h2>
        </div>
        <TestimonialSlider />
      </section>

      {/* CTA */}
      <section className="section text-center">
        <div className="glass-panel relative overflow-hidden px-6 py-16">
          <div className="absolute inset-0 bg-red-glow" />
          <h2 className="h2 relative">Got Footage That Deserves<br />A Real Edit?</h2>
          <p className="body-muted relative mx-auto mt-4 max-w-md">Let's turn it into something worth watching.</p>
          <Link to="/contact" className="btn-primary relative mt-8 inline-flex">Start a Project <FaArrowRight /></Link>
        </div>
      </section>
    </div>
  )
}
