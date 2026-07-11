import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'

export default function ProtectedRoute({ children }) {
  const { isOwner, loading } = useAuth()
  const location = useLocation()

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-obsidian text-ash">
        Checking access…
      </div>
    )
  }

  if (!isOwner) {
    return <Navigate to="/admin/login" state={{ from: location }} replace />
  }

  return children
}
