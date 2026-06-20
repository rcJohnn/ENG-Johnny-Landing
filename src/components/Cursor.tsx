import { useEffect } from 'react'

/**
 * Cursor — cursor custom de dos piezas (dot + ring con lag) para desktop.
 * Portado de motion.js (cursor). Se desactiva en pointer:coarse / reduced-motion.
 * No renderiza nada en el árbol React; crea los nodos directamente en <body>.
 */
export function Cursor() {
  useEffect(() => {
    const reduced = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
    const coarse = window.matchMedia?.('(pointer: coarse)').matches
    if (reduced || coarse) return

    const dot = document.createElement('div')
    dot.className = 'pf-cursor'
    const ring = document.createElement('div')
    ring.className = 'pf-cursor-ring'
    document.body.append(dot, ring)

    let mx = innerWidth / 2
    let my = innerHeight / 2
    let rx = mx
    let ry = my
    let raf = 0

    const onMove = (e: MouseEvent) => {
      mx = e.clientX
      my = e.clientY
      dot.style.transform = `translate(${mx}px, ${my}px) translate(-50%, -50%)`
      const isLink = !!(e.target as Element)?.closest?.('a, button, [data-cursor]')
      dot.classList.toggle('is-link', isLink)
      ring.classList.toggle('is-link', isLink)
    }
    const loop = () => {
      rx += (mx - rx) * 0.18
      ry += (my - ry) * 0.18
      ring.style.transform = `translate(${rx}px, ${ry}px) translate(-50%, -50%)`
      raf = requestAnimationFrame(loop)
    }

    addEventListener('mousemove', onMove)
    loop()

    return () => {
      removeEventListener('mousemove', onMove)
      cancelAnimationFrame(raf)
      dot.remove()
      ring.remove()
    }
  }, [])

  return null
}
