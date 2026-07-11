import AdminCollectionManager from '../../components/admin/AdminCollectionManager.jsx'

export default function TestimonialsManage() {
  return (
    <AdminCollectionManager
      collectionName="testimonials"
      title="Testimonials"
      storageFolder="testimonials"
      columns={['name', 'company', 'rating']}
      fields={[
        { name: 'name', label: 'Client Name', type: 'text', required: true },
        { name: 'company', label: 'Company', type: 'text' },
        { name: 'rating', label: 'Rating (1-5)', type: 'number', required: true },
        { name: 'review', label: 'Review', type: 'textarea', required: true },
        { name: 'image', label: 'Client Photo', type: 'file', accept: 'image/*' },
      ]}
    />
  )
}
