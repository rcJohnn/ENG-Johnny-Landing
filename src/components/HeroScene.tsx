import { useEffect, useRef } from 'react'

/**
 * HeroScene — "Living System Graph".
 *
 * Un grafo de sistema vivo renderizado en Canvas 2D, no un asset estático.
 * Nodos (módulos/servicios) flotan con física propia; el cursor actúa como
 * un AGENTE que recorre el sistema: atrae los nodos cercanos con resorte,
 * traza conexiones en vivo a los más próximos, e inyecta paquetes de datos
 * que viajan por esas conexiones. Constelación dinámica entre nodos por
 * proximidad. Monocromo + azure (--signal) como única señal.
 *
 * Performance: un solo rAF, DPR-aware, se pausa fuera de viewport
 * (IntersectionObserver). Degrada en touch (animación autónoma, sin cursor)
 * y en prefers-reduced-motion (un frame estático).
 */

type RGB = [number, number, number]

function hexToRgb(hex: string): RGB {
  const h = hex.trim().replace('#', '')
  const n = parseInt(
    h.length === 3
      ? h.split('').map((c) => c + c).join('')
      : h,
    16,
  )
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255]
}

interface Node {
  hx: number // home x
  hy: number // home y
  x: number
  y: number
  vx: number
  vy: number
  z: number // profundidad 0.4..1 → tamaño + parallax
  r: number
  phase: number // desfase para drift autónomo
  glow: number // 0..1 cercanía al cursor (suavizado)
}

export function HeroScene() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d', { alpha: true })
    if (!ctx) return

    const reduced = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false
    const coarse = window.matchMedia?.('(pointer: coarse)').matches ?? false

    // Tokens del design system (no hardcodear color en JS).
    const css = getComputedStyle(document.documentElement)
    const SIGNAL = hexToRgb(css.getPropertyValue('--signal') || '#2F6BFF')
    const MIST = hexToRgb(css.getPropertyValue('--mist') || '#9A9AA0')
    const LINE = hexToRgb(css.getPropertyValue('--line-dark') || '#1C1C20')
    const rgba = (c: RGB, a: number) => `rgba(${c[0]},${c[1]},${c[2]},${a})`

    let w = 0
    let h = 0
    let dpr = 1
    let nodes: Node[] = []

    // Cursor (objetivo + posición suavizada para que el campo "persiga" con inercia).
    const mouse = { x: -9999, y: -9999, tx: -9999, ty: -9999, active: false }

    const INFLUENCE = 230 // radio de influencia del cursor
    const LINK_DIST = 150 // distancia máx. para conexión nodo-nodo
    const MAX_TRACERS = 7 // conexiones cursor → nodos más cercanos

    function build() {
      const rect = canvas!.getBoundingClientRect()
      w = rect.width
      h = rect.height
      dpr = Math.min(window.devicePixelRatio || 1, 2)
      canvas!.width = Math.round(w * dpr)
      canvas!.height = Math.round(h * dpr)
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0)

      // Densidad por área, sesgada hacia la derecha (la izquierda lleva el texto).
      const count = Math.max(28, Math.min(72, Math.floor((w * h) / 24000)))
      nodes = Array.from({ length: count }, () => {
        const bias = Math.pow(Math.random(), 0.62) // empuja hacia 1 → derecha
        const hx = w * (0.08 + 0.92 * bias)
        const hy = h * (0.06 + 0.88 * Math.random())
        const z = 0.4 + Math.random() * 0.6
        return {
          hx,
          hy,
          x: hx,
          y: hy,
          vx: 0,
          vy: 0,
          z,
          r: 1.1 + z * 2.2,
          phase: Math.random() * Math.PI * 2,
          glow: 0,
        }
      })
    }

    function step(t: number) {
      // Suaviza el cursor hacia su objetivo (inercia → "persigue").
      mouse.x += (mouse.tx - mouse.x) * 0.16
      mouse.y += (mouse.ty - mouse.y) * 0.16

      ctx!.clearRect(0, 0, w, h)

      const time = t * 0.001

      // --- Física por nodo ---
      for (const n of nodes) {
        // Drift autónomo suave (el sistema respira aunque no haya cursor).
        // Drift autónomo: el sistema deriva visiblemente aunque no haya cursor.
        // Dos ondas por eje (frecuencias distintas) → trayectoria orgánica, no robótica.
        const driftX = (Math.sin(time * 0.5 + n.phase) + Math.sin(time * 0.27 + n.phase * 2.1) * 0.6) * 0.62 * n.z
        const driftY = (Math.cos(time * 0.43 + n.phase * 1.3) + Math.cos(time * 0.23 + n.phase * 1.7) * 0.6) * 0.62 * n.z

        // Resorte de vuelta a casa (suave, para no anular el drift).
        let ax = (n.hx - n.x) * 0.009 + driftX
        let ay = (n.hy - n.y) * 0.009 + driftY

        // Atracción al cursor dentro del radio de influencia.
        let near = 0
        if (mouse.active) {
          const dx = mouse.x - n.x
          const dy = mouse.y - n.y
          const d = Math.hypot(dx, dy) || 1
          if (d < INFLUENCE) {
            near = 1 - d / INFLUENCE
            const pull = near * near * 0.9 * n.z
            ax += (dx / d) * pull
            ay += (dy / d) * pull
          }
        }
        n.glow += (near - n.glow) * 0.12

        n.vx = (n.vx + ax) * 0.86
        n.vy = (n.vy + ay) * 0.86
        n.x += n.vx
        n.y += n.vy
      }

      // --- Conexiones nodo-nodo (constelación dinámica) ---
      for (let i = 0; i < nodes.length; i++) {
        const a = nodes[i]
        for (let j = i + 1; j < nodes.length; j++) {
          const b = nodes[j]
          const dx = a.x - b.x
          const dy = a.y - b.y
          const d2 = dx * dx + dy * dy
          if (d2 > LINK_DIST * LINK_DIST) continue
          const d = Math.sqrt(d2)
          const base = (1 - d / LINK_DIST) * 0.5
          const hot = Math.max(a.glow, b.glow)
          ctx!.strokeStyle =
            hot > 0.05
              ? rgba(SIGNAL, base * (0.25 + hot * 0.75))
              : rgba(LINE, base)
          ctx!.lineWidth = 1
          ctx!.beginPath()
          ctx!.moveTo(a.x, a.y)
          ctx!.lineTo(b.x, b.y)
          ctx!.stroke()
        }
      }

      // --- Tracers cursor → nodos más cercanos + paquetes de datos ---
      if (mouse.active) {
        const ranked = nodes
          .map((n) => ({ n, d: Math.hypot(mouse.x - n.x, mouse.y - n.y) }))
          .filter((o) => o.d < INFLUENCE)
          .sort((a, b) => a.d - b.d)
          .slice(0, MAX_TRACERS)

        for (let k = 0; k < ranked.length; k++) {
          const { n, d } = ranked[k]
          const a = (1 - d / INFLUENCE) * 0.9
          ctx!.strokeStyle = rgba(SIGNAL, a * 0.5)
          ctx!.lineWidth = 1
          ctx!.beginPath()
          ctx!.moveTo(mouse.x, mouse.y)
          ctx!.lineTo(n.x, n.y)
          ctx!.stroke()

          // Paquete de datos viajando del cursor al nodo (loop temporal).
          const prog = (time * 0.8 + k * 0.16) % 1
          const px = mouse.x + (n.x - mouse.x) * prog
          const py = mouse.y + (n.y - mouse.y) * prog
          ctx!.fillStyle = rgba(SIGNAL, a)
          ctx!.beginPath()
          ctx!.arc(px, py, 1.8, 0, Math.PI * 2)
          ctx!.fill()
        }
      }

      // --- Nodos ---
      for (const n of nodes) {
        const g = n.glow
        if (g > 0.04) {
          // Halo azure para nodos activos.
          ctx!.fillStyle = rgba(SIGNAL, 0.18 * g)
          ctx!.beginPath()
          ctx!.arc(n.x, n.y, n.r + 8 * g, 0, Math.PI * 2)
          ctx!.fill()
          ctx!.fillStyle = rgba(SIGNAL, 0.65 + 0.35 * g)
          ctx!.beginPath()
          ctx!.arc(n.x, n.y, n.r + 1.2 * g, 0, Math.PI * 2)
          ctx!.fill()
        } else {
          // Nodo en reposo: aro hueco monocromo.
          ctx!.strokeStyle = rgba(MIST, 0.35 + n.z * 0.25)
          ctx!.lineWidth = 1
          ctx!.beginPath()
          ctx!.arc(n.x, n.y, n.r, 0, Math.PI * 2)
          ctx!.stroke()
        }
      }

      // --- Glow + probe del cursor ---
      if (mouse.active) {
        const grad = ctx!.createRadialGradient(mouse.x, mouse.y, 0, mouse.x, mouse.y, INFLUENCE * 0.8)
        grad.addColorStop(0, rgba(SIGNAL, 0.1))
        grad.addColorStop(1, rgba(SIGNAL, 0))
        ctx!.fillStyle = grad
        ctx!.beginPath()
        ctx!.arc(mouse.x, mouse.y, INFLUENCE * 0.8, 0, Math.PI * 2)
        ctx!.fill()

        ctx!.strokeStyle = rgba(SIGNAL, 0.5)
        ctx!.lineWidth = 1
        ctx!.beginPath()
        ctx!.arc(mouse.x, mouse.y, 5 + Math.sin(time * 3) * 1.5, 0, Math.PI * 2)
        ctx!.stroke()
      }
    }

    // Frame estático (reduced-motion): nodos en casa + constelación, sin loop.
    function staticFrame() {
      ctx!.clearRect(0, 0, w, h)
      for (let i = 0; i < nodes.length; i++) {
        const a = nodes[i]
        for (let j = i + 1; j < nodes.length; j++) {
          const b = nodes[j]
          const d = Math.hypot(a.x - b.x, a.y - b.y)
          if (d > LINK_DIST) continue
          ctx!.strokeStyle = rgba(LINE, (1 - d / LINK_DIST) * 0.5)
          ctx!.lineWidth = 1
          ctx!.beginPath()
          ctx!.moveTo(a.x, a.y)
          ctx!.lineTo(b.x, b.y)
          ctx!.stroke()
        }
      }
      for (const n of nodes) {
        ctx!.strokeStyle = rgba(MIST, 0.35 + n.z * 0.25)
        ctx!.lineWidth = 1
        ctx!.beginPath()
        ctx!.arc(n.x, n.y, n.r, 0, Math.PI * 2)
        ctx!.stroke()
      }
    }

    let raf = 0
    let running = false
    const loop = (t: number) => {
      step(t)
      raf = requestAnimationFrame(loop)
    }
    const start = () => {
      if (running || reduced) return
      running = true
      raf = requestAnimationFrame(loop)
    }
    const stop = () => {
      running = false
      cancelAnimationFrame(raf)
    }

    // Cursor (solo si no es touch).
    const onMove = (e: MouseEvent) => {
      const rect = canvas!.getBoundingClientRect()
      mouse.tx = e.clientX - rect.left
      mouse.ty = e.clientY - rect.top
      if (!mouse.active) {
        // Aparece sin saltar desde el centro.
        mouse.x = mouse.tx
        mouse.y = mouse.ty
        mouse.active = true
      }
    }
    const onLeave = () => {
      mouse.active = false
      mouse.tx = -9999
      mouse.ty = -9999
    }

    build()
    if (reduced) {
      staticFrame()
    } else {
      if (!coarse) {
        window.addEventListener('mousemove', onMove)
        document.addEventListener('mouseleave', onLeave)
      }
      start()
    }

    // Pausa cuando el hero no está visible.
    const io = new IntersectionObserver(
      ([entry]) => {
        if (reduced) return
        if (entry.isIntersecting) start()
        else stop()
      },
      { threshold: 0 },
    )
    io.observe(canvas)

    let resizeRaf = 0
    const onResize = () => {
      cancelAnimationFrame(resizeRaf)
      resizeRaf = requestAnimationFrame(() => {
        build()
        if (reduced) staticFrame()
      })
    }
    window.addEventListener('resize', onResize)

    return () => {
      stop()
      io.disconnect()
      window.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseleave', onLeave)
      window.removeEventListener('resize', onResize)
      cancelAnimationFrame(resizeRaf)
    }
  }, [])

  return <canvas ref={canvasRef} className="pf-hero-scene" aria-hidden="true" />
}
