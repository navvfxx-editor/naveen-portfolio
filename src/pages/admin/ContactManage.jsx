import AdminSingletonEditor from '../../components/admin/AdminSingletonEditor.jsx'
import { defaultContact } from '../../utils/defaultData.js'

export default function ContactManage() {
  return (
    <AdminSingletonEditor
      collectionName="siteContent"
      docId="contact"
      title="Contact Info"
      defaults={defaultContact}
      fields={[
        { name: 'ownerName', label: 'Owner Name (shown on hover)', type: 'text' },
        { name: 'phone', label: 'Phone (display format)', type: 'tel' },
        { name: 'whatsappNumber', label: 'WhatsApp Number', type: 'tel', hint: 'Digits only with country code, e.g. 918824096308 — no + or spaces.' },
        { name: 'email', label: 'Email', type: 'email' },
        { name: 'instagramUrl', label: 'Instagram Profile URL', type: 'url', hint: 'e.g. https://www.instagram.com/navv.fx' },
        { name: 'instagramHandle', label: 'Instagram Handle (display)', type: 'text' },
        { name: 'youtubeUrl', label: 'YouTube Channel URL (footer icon)', type: 'url' },
        { name: 'linkedinUrl', label: 'LinkedIn Profile URL (footer icon)', type: 'url' },
      ]}
    />
  )
}
