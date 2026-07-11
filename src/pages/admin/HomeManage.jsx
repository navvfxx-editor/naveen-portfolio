import AdminSingletonEditor from '../../components/admin/AdminSingletonEditor.jsx'
import { defaultHero } from '../../utils/defaultData.js'

export default function HomeManage() {
  return (
    <AdminSingletonEditor
      collectionName="siteContent"
      docId="hero"
      title="Home Page — Hero Section"
      defaults={defaultHero}
      fields={[
        { name: 'title', label: 'Hero Title', type: 'text' },
        { name: 'subtitle', label: 'Subtitle', type: 'text' },
        { name: 'description', label: 'Description', type: 'textarea' },
        { name: 'bgVideoUrl', label: 'Background Video', type: 'file', accept: 'video/*', hint: 'Uploads to the backend server.' },
        { name: 'primaryBtnText', label: 'Primary Button Text', type: 'text' },
        { name: 'secondaryBtnText', label: 'Secondary Button Text', type: 'text' },
      ]}
    />
  )
}
