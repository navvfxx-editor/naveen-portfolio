import { Link } from 'react-router-dom'
import { FaHome } from 'react-icons/fa'

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-5 text-center">
      <p className="font-display text-[22vw] leading-none text-white/5 sm:text-[14rem]">404</p>
      <h1 className="-mt-8 font-heading text-2xl text-mist">This frame doesn't exist</h1>
      <p className="mt-2 text-ash">The page you're looking for was cut from the final edit.</p>
      <Link to="/" className="btn-primary mt-8"><FaHome /> Back Home</Link>
    </div>
  )
}
