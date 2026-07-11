import { useEffect, useRef } from 'react'

export default function CursorFollower() {
  const ref = useRef(null)

  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches) return // skip on touch devices
    const el = ref.current
    let x = 0, y = 0, tx = 0, ty = 0
    const move = (e) => { tx = e.clientX; ty = e.clientY }
    window.addEventListener('mousemove', move)

    let raf
    const loop = () => {
      x += (tx - x) * 0.15
      y += (ty - y) * 0.15
      if (el) el.style.transform = `translate3d(${x - 12}px, ${y - 12}px, 0)`
      raf = requestAnimationFrame(loop)
    }
    loop()
    return () => { window.removeEventListener('mousemove', move); cancelAnimationFrame(raf) }
  }, [])

  if (typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches) return null

  return (
    <div
      ref={ref}
      className="pointer-events-none fixed left-0 top-0 z-[90] hidden h-6 w-6 rounded-full border border-blood/70 mix-blend-difference lg:block"
      style={{ willChange: 'transform' }}
    />
  )
}
