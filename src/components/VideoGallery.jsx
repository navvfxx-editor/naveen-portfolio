import { useMemo, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FaPlay } from 'react-icons/fa'
import { useSiteData } from '../context/SiteDataContext.jsx'

function VideoCard({ video, vertical }) {
  const [playing, setPlaying] = useState(false)
  const thumb = video.thumbnail || `https://i.ytimg.com/vi/${video.youtubeId}/hqdefault.jpg`

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.4 }}
      className={`group relative overflow-hidden rounded-2xl border border-white/10 bg-graphite shadow-premium ${
        vertical ? 'aspect-[9/16]' : 'aspect-video'
      }`}
    >
      {playing ? (
        // Embedded, inline playback — stays on this page, never redirects to YouTube.
        <iframe
          className="h-full w-full"
          src={`https://www.youtube-nocookie.com/embed/${video.youtubeId}?autoplay=1&rel=0&modestbranding=1&playsinline=1`}
          title={video.title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      ) : (
        <button
          type="button"
          onClick={() => setPlaying(true)}
          className="relative h-full w-full text-left focus-ring"
          aria-label={`Play ${video.title}`}
        >
          <img src={thumb} alt={video.title} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" loading="lazy" />
          <div className="absolute inset-0 bg-gradient-to-t from-obsidian/90 via-obsidian/10 to-transparent" />
          <span className="absolute left-1/2 top-1/2 flex h-14 w-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-blood/90 text-white shadow-red-glow transition-transform duration-300 group-hover:scale-110">
            <FaPlay className="ml-1" />
          </span>
          <div className="absolute bottom-0 left-0 right-0 p-4">
            <p className="font-heading text-sm text-mist">{video.title}</p>
            {video.duration && <p className="mt-1 text-xs text-ash">{video.duration}</p>}
          </div>
        </button>
      )}
    </motion.div>
  )
}

export default function VideoGallery({ title = 'Latest Cuts', showTitle = true }) {
  const { portfolio } = useSiteData()
  const [tab, setTab] = useState('shorts')

  const videos = useMemo(
    () => portfolio.filter((p) => (p.youtubeId ? p.type === tab : false)),
    [portfolio, tab],
  )

  return (
    <div>
      {showTitle && (
        <div className="mb-8 flex flex-col items-center gap-6 text-center">
          <h3 className="h2">{title}</h3>
        </div>
      )}

      <div className="mb-10 flex items-center justify-center gap-3">
        {[
          { key: 'shorts', label: 'Short Form' },
          { key: 'long', label: 'Long Form' },
        ].map((t) => (
          <button
            key={t.key}
            onClick={() => setTab(t.key)}
            className={`rounded-full px-6 py-2.5 font-heading text-sm tracking-wide transition-all duration-300 focus-ring ${
              tab === t.key
                ? 'bg-blood text-white shadow-red-glow'
                : 'border border-white/15 bg-white/[0.03] text-ash hover:border-blood/50 hover:text-mist'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={tab}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className={
            tab === 'shorts'
              ? 'grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4'
              : 'grid grid-cols-1 gap-6 sm:grid-cols-2'
          }
        >
          {videos.length === 0 && (
            <p className="col-span-full py-12 text-center text-ash">
              No {tab === 'shorts' ? 'short form' : 'long form'} videos added yet. Add some from the Admin Panel.
            </p>
          )}
          {videos.map((v) => (
            <VideoCard key={v.id} video={v} vertical={tab === 'shorts'} />
          ))}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
