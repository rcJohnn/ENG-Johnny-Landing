import { Reveal } from '../components/Reveal'
import { SectionLabel } from '../components/SectionLabel'
import { Tag } from '../components/Tag'
import { ArrowUpRight } from '../components/icons'

const PROJECTS = [
  {
    idx: '/01',
    name: 'NutrisSys',
    url: 'https://www.nutrissys.com',
    desc: 'Practice management system for nutritionists: scheduling, patients, AI-assisted plans and billing — all in one flow.',
    tags: ['React', 'TypeScript', 'C#', '.NET Core', 'Azure', 'SQL Server'],
    img: '/images/proj-nutrissys.webp',
    imgAvif: '/images/proj-nutrissys.avif',
    alt: 'Hero screenshot of NutrisSys, a practice management system, with the message "Your practice, in flow"',
  },
  {
    idx: '/02',
    name: 'Nutricionista Pamela Alvarado',
    url: 'https://www.nutricionistapamelaalvarado.com',
    desc: 'Professional landing page for clinical and sports nutrition: approach, services and online and in-person consultation booking in Costa Rica.',
    tags: ['React', 'Vite', 'Motion'],
    img: '/images/proj-pamela-alvarado.webp',
    imgAvif: '/images/proj-pamela-alvarado.avif',
    alt: 'Hero screenshot of Pamela Alvarado\'s landing page, clinical and sports nutritionist, with the message "Real health, no perfection"',
  },
]

export function Proyectos() {
  return (
    <section className="pf-section" id="projects">
      <hr className="pf-rule" />
      <div className="pf-container" style={{ paddingTop: 'var(--space-10)' }}>
        <Reveal>
          <div style={{ marginBottom: 'var(--space-10)' }}>
            <SectionLabel index="04" onDark>
              Projects
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
                      View live →
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
