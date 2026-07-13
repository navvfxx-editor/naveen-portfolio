import AdminCollectionManager from '../../components/admin/AdminCollectionManager.jsx'
import { CATEGORIES } from '../../utils/defaultData.js'

export default function PortfolioManage() {
  return (
    <AdminCollectionManager
      collectionName="portfolio"
      title="Portfolio Videos"
      columns={['title', 'category', 'type']}
      fields={[
        { name: 'title', label: 'Title', type: 'text', required: true },
        { name: 'category', label: 'Category', type: 'select', required: true, options: CATEGORIES.filter((c) => c !== 'All') },
        {
          name: 'type', label: 'Video Type', type: 'select', required: true,
          options: ['shorts', 'long'],
          hint: "'shorts' shows under Short Form, 'long' shows under Long Form.",
        },
        {
          name: 'youtubeId', label: 'YouTube Link', type: 'youtube', required: true,
          hint: 'Paste the full YouTube video/shorts link — the thumbnail shown in the Portfolio is pulled automatically from YouTube.',
        },
      ]}
    />
  )
}
