import { createContext, useContext, useEffect, useState } from 'react'
import { apiFetch, setAuthToken, getAuthToken } from '../services/apiClient.js'

const AuthContext = createContext(null)

// There is only ever ONE account in the database (created via `npm run seed`
// on the backend), so a valid session token always means "the owner". No
// email-matching needed here — the backend already enforces that.
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    (async () => {
      const token = getAuthToken()
      if (!token) {
        setLoading(false)
        return
      }
      try {
        const me = await apiFetch('/api/auth/me')
        setUser(me)
      } catch {
        setAuthToken(null) // token expired/invalid — clear it
      } finally {
        setLoading(false)
      }
    })()
  }, [])

  const isOwner = !!user

  async function login(email, password) {
    const data = await apiFetch('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    })
    setAuthToken(data.token)
    setUser({ email: data.email })
    return data
  }

  async function logout() {
    setAuthToken(null)
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, isOwner, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
