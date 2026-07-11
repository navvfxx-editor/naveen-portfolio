import { motion } from 'framer-motion'
import VideoGallery from '../components/VideoGallery.jsx'

export default function Portfolio() {
  return (
    <div className="section pt-32">
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-16 text-center font-display text-[16vw] leading-[0.9] tracking-wide text-mist sm:text-[10vw] lg:text-[7vw]"
      >
        PORTFOLIO<span className="text-blood">.</span>
      </motion.h1>

      <VideoGallery showTitle={false} />
    </div>
  )
}
