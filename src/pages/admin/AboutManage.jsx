import AdminSingletonEditor from '../../components/admin/AdminSingletonEditor.jsx'
import { defaultAbout } from '../../utils/defaultData.js'

export default function AboutManage() {
  return (
    <AdminSingletonEditor
      collectionName="siteContent"
      docId="about"
      title="About Page"
      defaults={defaultAbout}
      fields={[
        { name: 'photoUrl', label: 'Profile Photo', type: 'file', accept: 'image/*' },
        { name: 'story', label: 'About Story', type: 'textarea', rows: 5 },
        { name: 'mission', label: 'Mission Statement', type: 'textarea', rows: 3 },
        { name: 'resumeUrl', label: 'Resume (PDF)', type: 'file', accept: '.pdf' },
      ]}
    />
  )
}
