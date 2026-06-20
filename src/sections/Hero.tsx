import { useEffect, useRef, useState } from 'react'
import { motion, useScroll, useTransform } from 'motion/react'
import { Button } from '../components/Button'
import { HeroScene } from '../components/HeroScene'

const LINES: { words: string[]; dim: boolean }[] = [
  { words: ['Arquitecturas', 'que', 'escalan.'], dim: false },
  { words: ['Agentes', 'que', 'ejecutan.'], dim: true },
]

function Headline() {
  let i = 0
  return (
    <h1 className="pf-headline">
      {LINES.map((ln, li) => (
        <span className="ln" key={li}>
          {ln.words.map((w, wi) => {
            const delay = 0.5 + i * 0.08
            i++
            return (
              <span key={wi}>
                <span className="wdmask">
                  <span className={'wd' + (ln.dim ? ' dim' : '')} style={{ transitionDelay: `${delay}s` }}>
                    {w}
                  </span>
                </span>
                {wi < ln.words.length - 1 ? ' ' : null}
              </span>
            )
          })}
        </span>
      ))}
    </h1>
  )
}

export function Hero() {
  const ref = useRef<HTMLElement>(null)
  const cueRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const [ready, setReady] = useState(false)

  // Dispara la cortina del headline una vez montado.
  useEffect(() => {
    const id = requestAnimationFrame(() => setReady(true))
    return () => cancelAnimationFrame(id)
  }, [])

  // El contenido del hero (headline, CTAs) y el scroll cue deben DESVANECERSE al
  // bajar, para no quedar colgados/visibles sobre la franja de salida mientras
  // entra la siguiente sección. Se maneja por DOM directo porque el binding de
  // `opacity` de motion no aplica de forma fiable en estos elementos (sí lo hace
  // el transform `y`). El movimiento sigue a cargo de motion (contentY).
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY
      const h = window.innerHeight || 800
      if (cueRef.current) cueRef.current.style.opacity = String(Math.max(0, 1 - y / 140))
      if (contentRef.current) contentRef.current.style.opacity = String(Math.max(0, 1 - y / (h * 0.5)))
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Parallax scroll-driven: el fondo se mueve y escala, el contenido se va.
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '12%'])
  const bgScale = useTransform(scrollYProgress, [0, 1], [1, 1.08])
  const contentY = useTransform(scrollYProgress, [0, 1], [0, -60])

  return (
    <section className={`pf-hero${ready ? ' is-ready' : ''}`} id="top" ref={ref}>
      <motion.div className="pf-hero__bg" style={{ y: bgY, scale: bgScale }}>
        <HeroScene />
      </motion.div>
      <div className="pf-hero__grid" aria-hidden="true" />
      <div className="pf-hero__veil" aria-hidden="true" />

      <motion.div className="pf-hero__content" style={{ y: contentY }} ref={contentRef}>
        <div className="pf-container">
          <div className="ds-label" style={{ marginBottom: 'var(--space-6)', color: 'var(--mist)' }}>
            [ Cartago · Costa Rica — Systems Engineer / AI · Cloud ]
          </div>
          <Headline />
          <p
            style={{
              maxWidth: '46ch',
              marginTop: 'var(--space-6)',
              color: 'var(--paper)',
              fontSize: 'var(--fs-body-lg)',
              opacity: 0.92,
            }}
          >
            Ingeniero de sistemas. Diseño arquitecturas en la nube y agentes de IA que sostienen
            producto real — de la red al modelo.
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-3)', marginTop: 'var(--space-8)' }}>
            <Button variant="signal" size="lg" icon="arrow" href="#proyectos">
              Ver proyectos
            </Button>
            <Button variant="secondary" size="lg" icon="download" href="#" magnetic={false}>
              Descargar CV
            </Button>
          </div>
        </div>
      </motion.div>

      <div className="pf-scrollcue ds-label" ref={cueRef}>
        <span className="bar" aria-hidden="true" />
        <span>Scroll</span>
      </div>
    </section>
  )
}
