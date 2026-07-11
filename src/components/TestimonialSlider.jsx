import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Pagination } from 'swiper/modules'
import { FaStar, FaQuoteLeft } from 'react-icons/fa'
import { useSiteData } from '../context/SiteDataContext.jsx'
import 'swiper/css'
import 'swiper/css/pagination'

export default function TestimonialSlider() {
  const { testimonials } = useSiteData()

  return (
    <Swiper
      modules={[Autoplay, Pagination]}
      autoplay={{ delay: 4500, disableOnInteraction: false }}
      pagination={{ clickable: true }}
      spaceBetween={24}
      slidesPerView={1}
      breakpoints={{ 768: { slidesPerView: 2 }, 1200: { slidesPerView: 3 } }}
      className="!pb-12"
    >
      {testimonials.map((t) => (
        <SwiperSlide key={t.id}>
          <div className="glass-panel h-full p-7">
            <FaQuoteLeft className="mb-4 text-2xl text-blood/70" />
            <p className="text-sm text-ash">{t.review}</p>
            <div className="mt-6 flex items-center gap-3">
              {t.image ? (
                <img src={t.image} alt={t.name} className="h-11 w-11 rounded-full object-cover" />
              ) : (
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-blood/20 font-heading text-mist">
                  {t.name?.[0]}
                </div>
              )}
              <div>
                <p className="font-heading text-sm text-mist">{t.name}</p>
                <p className="text-xs text-ash">{t.company}</p>
              </div>
              <div className="ml-auto flex gap-0.5 text-blood">
                {Array.from({ length: t.rating || 5 }).map((_, i) => <FaStar key={i} size={12} />)}
              </div>
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  )
}
