import AdminCollectionManager from '../../components/admin/AdminCollectionManager.jsx'

export default function FaqManage() {
  return (
    <AdminCollectionManager
      collectionName="faqs"
      title="FAQ"
      storageFolder="faqs"
      columns={['question']}
      fields={[
        { name: 'question', label: 'Question', type: 'text', required: true },
        { name: 'answer', label: 'Answer', type: 'textarea', required: true },
      ]}
    />
  )
}
