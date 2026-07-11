import { motion, AnimatePresence } from 'framer-motion'

export default function Loader({ show }) {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: 'easeInOut' }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center gap-6 bg-obsidian"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="font-display text-5xl tracking-[0.3em] text-mist"
          >
            NAVEEN<span className="text-blood">.</span>
          </motion.div>
          <div className="h-[2px] w-48 overflow-hidden rounded-full bg-white/10">
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: '100%' }}
              transition={{ duration: 1.1, repeat: Infinity, ease: 'easeInOut' }}
              className="h-full w-full bg-gradient-to-r from-transparent via-blood to-transparent"
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
