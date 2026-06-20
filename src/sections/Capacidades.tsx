import { motion } from 'motion/react'
import { Reveal } from '../components/Reveal'
import { RevealStagger } from '../components/RevealStagger'
import { SectionLabel } from '../components/SectionLabel'
import { Tag } from '../components/Tag'
import { fadeUp } from '../motion.presets'

const ITEMS = [
  { n: '01', title: 'IA & Agentes', desc: 'Diseño de agentes, RAG y pipelines de inferencia listos para producción.', tags: ['LangChain', 'OpenAI', 'RAG', 'Vector DB'] },
  { n: '02', title: 'Azure Cloud', desc: 'Arquitectura, despliegue y observabilidad sobre Azure y contenedores.', tags: ['Azure', 'Docker', 'K8s', 'Terraform'] },
  { n: '03', title: 'Fullstack', desc: 'Producto end-to-end: APIs, datos y front con foco en rendimiento.', tags: ['React', 'Node.js', 'Python', 'PostgreSQL'] },
  { n: '04', title: 'Redes & Seguridad', desc: 'Fundamentos sólidos de red, hardening y diseño seguro por defecto.', tags: ['Linux', 'VPN', 'Firewall', 'TLS'] },
]

export function Capacidades() {
  return (
    <section className="pf-section" id="capacidades">
      <hr className="pf-rule" />
      <div className="pf-container" style={{ paddingTop: 'var(--space-10)' }}>
        <Reveal>
          <div style={{ marginBottom: 'var(--space-10)' }}>
            <SectionLabel index="03" onDark>
              Capacidades
            </SectionLabel>
          </div>
        </Reveal>
      </div>
      <div className="pf-container">
        <RevealStagger className="pf-cap-grid">
          {ITEMS.map((it) => (
            <motion.div className="pf-cap-cell" variants={fadeUp} key={it.n} data-cursor>
              <div className="ds-label" style={{ color: 'var(--mist)', marginBottom: 'var(--space-6)' }}>
                /{it.n}
              </div>
              <h3 className="pf-display-md" style={{ marginBottom: 'var(--space-4)' }}>
                {it.title}
              </h3>
              <p style={{ color: 'var(--mist)', maxWidth: '34ch', marginBottom: 'var(--space-6)' }}>{it.desc}</p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-2)' }}>
                {it.tags.map((t) => (
                  <Tag key={t} onDark>
                    {t}
                  </Tag>
                ))}
              </div>
            </motion.div>
          ))}
        </RevealStagger>
      </div>
    </section>
  )
}
