import { useSiteData } from '../context/SiteDataContext.jsx'
import ContactIcons from '../components/ContactIcons.jsx'
import VideoGallery from '../components/VideoGallery.jsx'

export default function Contact() {
  const { contact } = useSiteData()

  return (
    <div className="section pt-32">
      <div className="mb-14 text-center">
        <p className="eyebrow justify-center">Contact</p>
        <h1 className="h2">Let's Talk About Your Project</h1>
        <p className="body-muted mx-auto mt-4 max-w-lg">
          Reach {contact.ownerName} directly — tap an option below and it opens straight in the app.
        </p>
      </div>

      <ContactIcons />

      <div className="mt-24">
        <VideoGallery title="See The Work" />
      </div>
    </div>
  )
}
