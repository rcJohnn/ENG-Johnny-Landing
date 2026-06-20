import { Reveal } from '../components/Reveal'
import { SectionLabel } from '../components/SectionLabel'
import { Tag } from '../components/Tag'
import { ArrowUpRight } from '../components/icons'

const PROJECTS = [
  {
    idx: '/01',
    name: 'NutrisSys',
    url: 'https://www.nutrissys.com',
    desc: 'Sistema de gestión de consultas para nutricionistas: agenda, pacientes, planes asistidos por IA y cobro — todo en un flujo.',
    tags: ['React', 'TypeScript', 'C#', '.NET Core', 'Azure', 'SQL Server'],
    img: '/images/proj-nutrissys.webp',
    imgAvif: '/images/proj-nutrissys.avif',
    alt: 'Captura del hero de NutrisSys, sistema de gestión de consultas con el mensaje "Tu consulta, en flujo"',
  },
  {
    idx: '/02',
    name: 'Nutricionista Pamela Alvarado',
    url: 'https://www.nutricionistapamelaalvarado.com',
    desc: 'Landing profesional para nutrición clínica y deportiva: enfoque, servicios y agenda de consultas online y presenciales en Costa Rica.',
    tags: ['React', 'Vite', 'Motion'],
    img: '/images/proj-pamela-alvarado.webp',
    imgAvif: '/images/proj-pamela-alvarado.avif',
    alt: 'Captura del hero de la landing de Pamela Alvarado, nutricionista clínica y deportiva, con el mensaje "Salud real, sin perfección"',
  },
]

export function Proyectos() {
  return (
    <section className="pf-section" id="proyectos">
      <hr className="pf-rule" />
      <div className="pf-container" style={{ paddingTop: 'var(--space-10)' }}>
        <Reveal>
          <div style={{ marginBottom: 'var(--space-10)' }}>
            <SectionLabel index="04" onDark>
              Proyectos
            </SectionLabel>
          </div>
        </Reveal>
        <div className="pf-proj">
          {PROJECTS.map((p, i) => (
            <Reveal key={p.idx} delay={i * 0.08}>
              <a className="pf-proj-card" href={p.url} target="_blank" rel="noopener noreferrer">
                <div className="pf-proj-head">
                  <div>
                    <div className="ds-label" style={{ color: 'var(--mist)', marginBottom: 'var(--space-3)' }}>
                      {p.idx}
                    </div>
                    <h3 className="pf-proj-title pf-display-lg" style={{ marginBottom: 'var(--space-5)' }}>
                      {p.name}
                    </h3>
                    <p style={{ maxWidth: '42ch', color: 'var(--mist)', marginBottom: 'var(--space-5)' }}>{p.desc}</p>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-2)', marginBottom: 'var(--space-4)' }}>
                      {p.tags.map((t) => (
                        <Tag key={t} onDark>
                          {t}
                        </Tag>
                      ))}
                    </div>
                    <span className="ds-label" style={{ color: 'var(--paper)' }}>
                      Ver en vivo →
                    </span>
                  </div>
                  <span className="pf-proj-arrow" aria-hidden="true">
                    <ArrowUpRight />
                  </span>
                </div>
                <div className="pf-proj-media">
                  <picture>
                    <source srcSet={p.imgAvif} type="image/avif" />
                    <source srcSet={p.img} type="image/webp" />
                    <img src={p.img} alt={p.alt} loading="lazy" decoding="async" />
                  </picture>
                </div>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
