import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate, useLocation, Navigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { FaLock } from 'react-icons/fa'
import { useAuth } from '../../context/AuthContext.jsx'

export default function Login() {
  const { login, isOwner, loading: authLoading } = useAuth()
  const { register, handleSubmit, formState: { errors } } = useForm()
  const [submitting, setSubmitting] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()

  if (!authLoading && isOwner) {
    return <Navigate to={location.state?.from?.pathname || '/admin'} replace />
  }

  async function onSubmit(values) {
    setSubmitting(true)
    try {
      await login(values.email, values.password)
      toast.success('Welcome back, Naveen.')
      navigate('/admin')
    } catch (err) {
      toast.error(err.message || 'Invalid credentials.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-obsidian px-5">
      <div className="glass-panel w-full max-w-sm p-8">
        <div className="mb-6 flex flex-col items-center gap-3 text-center">
          <span className="flex h-12 w-12 items-center justify-center rounded-full bg-blood/15 text-xl text-blood"><FaLock /></span>
          <h1 className="font-heading text-xl text-mist">Owner Login</h1>
          <p className="text-xs text-ash">This dashboard is restricted to the site owner only.</p>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <input type="email" placeholder="Owner email" className="input-field" {...register('email', { required: true })} />
            {errors.email && <p className="mt-1 text-xs text-blood">Email is required.</p>}
          </div>
          <div>
            <input type="password" placeholder="Password" className="input-field" {...register('password', { required: true })} />
            {errors.password && <p className="mt-1 text-xs text-blood">Password is required.</p>}
          </div>
          <button type="submit" disabled={submitting} className="btn-primary w-full disabled:opacity-50">
            {submitting ? 'Signing in…' : 'Sign In'}
          </button>
        </form>
      </div>
    </div>
  )
}
