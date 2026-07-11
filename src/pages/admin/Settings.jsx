import AdminSingletonEditor from '../../components/admin/AdminSingletonEditor.jsx'
import { defaultSettings } from '../../utils/defaultData.js'

export default function Settings() {
  return (
    <AdminSingletonEditor
      collectionName="siteContent"
      docId="settings"
      title="Site Settings"
      defaults={defaultSettings}
      fields={[
        { name: 'siteName', label: 'Website Name', type: 'text' },
        { name: 'tagline', label: 'Tagline', type: 'text' },
        { name: 'logoUrl', label: 'Logo', type: 'file', accept: 'image/*' },
        { name: 'faviconUrl', label: 'Favicon', type: 'file', accept: 'image/*' },
        { name: 'footerText', label: 'Footer Text', type: 'text' },
        { name: 'themeAccent', label: 'Theme Accent Colour (hex)', type: 'text' },
        { name: 'googleAnalyticsId', label: 'Google Analytics Measurement ID', type: 'text' },
        { name: 'seoTitle', label: 'SEO Title', type: 'text' },
        { name: 'seoDescription', label: 'SEO Description', type: 'textarea' },
      ]}
    />
  )
}
