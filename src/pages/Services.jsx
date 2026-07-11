import { useSiteData } from '../context/SiteDataContext.jsx'
import ServiceCard from '../components/ServiceCard.jsx'

export default function Services() {
  const { services } = useSiteData()
  return (
    <div className="section pt-32">
      <div className="mb-14 text-center">
        <p className="eyebrow justify-center">Services</p>
        <h1 className="h2">Everything Your Footage Needs</h1>
      </div>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {services.map((s, i) => <ServiceCard key={s.id} service={s} index={i} />)}
      </div>
    </div>
  )
}
