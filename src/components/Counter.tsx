import { useEffect, useRef, useState } from 'react'

/**
 * Counter — anima un número de 0 → target cuando entra en viewport.
 * Portado de motion.js (counters). Respeta prefers-reduced-motion.
 */
interface CounterProps {
  target: number
  pad?: boolean // padStart(2, "0") → "04"
  durationMs?: number
}

const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3)

export function Counter({ target, pad = true, durationMs = 1400 }: CounterProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const [value, setValue] = useState(0)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const reduced = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
    if (reduced) {
      setValue(target)
      return
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((en) => {
          if (!en.isIntersecting) return
          io.unobserve(en.target)
          const t0 = performance.now()
          const tick = (now: number) => {
            const p = Math.min(1, (now - t0) / durationMs)
            setValue(Math.round(easeOutCubic(p) * target))
            if (p < 1) requestAnimationFrame(tick)
          }
          requestAnimationFrame(tick)
        })
      },
      { threshold: 0.6 },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [target, durationMs])

  return <span ref={ref}>{pad ? String(value).padStart(2, '0') : value}</span>
}
