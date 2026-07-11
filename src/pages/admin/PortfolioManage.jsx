import AdminCollectionManager from '../../components/admin/AdminCollectionManager.jsx'
import { CATEGORIES } from '../../utils/defaultData.js'

export default function PortfolioManage() {
  return (
    <AdminCollectionManager
      collectionName="portfolio"
      title="Portfolio Projects"
      storageFolder="portfolio"
      columns={['title', 'category', 'type', 'client']}
      fields={[
        { name: 'title', label: 'Title', type: 'text', required: true },
        { name: 'description', label: 'Description', type: 'textarea', required: true },
        { name: 'category', label: 'Category', type: 'select', required: true, options: CATEGORIES.filter((c) => c !== 'All') },
        {
          name: 'type', label: 'Video Type', type: 'select', required: true,
          options: ['shorts', 'long'],
          hint: "'shorts' shows under the Shorts tab, 'long' shows under Long Videos.",
        },
        { name: 'youtubeId', label: 'YouTube Video ID', type: 'text', required: true, hint: "The part after 'v=' in the YouTube URL — plays inline on the site, never redirects to YouTube." },
        { name: 'thumbnail', label: 'Custom Thumbnail (optional)', type: 'file', accept: 'image/*' },
        { name: 'client', label: 'Client Name', type: 'text' },
        { name: 'software', label: 'Software Used', type: 'text' },
        { name: 'duration', label: 'Duration', type: 'text' },
        { name: 'date', label: 'Project Date', type: 'text' },
        { name: 'featured', label: 'Featured', type: 'checkbox' },
      ]}
    />
  )
}
