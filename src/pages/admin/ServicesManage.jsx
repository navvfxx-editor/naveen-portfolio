import AdminCollectionManager from '../../components/admin/AdminCollectionManager.jsx'

export default function ServicesManage() {
  return (
    <AdminCollectionManager
      collectionName="services"
      title="Services"
      storageFolder="services"
      columns={['name']}
      fields={[
        { name: 'name', label: 'Service Name', type: 'text', required: true },
        { name: 'description', label: 'Description', type: 'textarea', required: true },
        {
          name: 'icon', label: 'Icon', type: 'select', required: true,
          options: ['FaFilm', 'FaHeart', 'FaYoutube', 'FaInstagram', 'FaShapes', 'FaPalette', 'FaBullhorn', 'FaBriefcase', 'FaMicrophone', 'FaImage', 'FaVideo', 'FaMagic'],
        },
      ]}
    />
  )
}
