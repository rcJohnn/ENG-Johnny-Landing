import { Reveal } from '../components/Reveal'
import { SectionLabel } from '../components/SectionLabel'
import { Badge } from '../components/Badge'

export function Contacto() {
  return (
    <section className="pf-section" id="contact">
      <hr className="pf-rule" />
      <div className="pf-container" style={{ paddingTop: 'var(--space-12)', paddingBottom: 'var(--space-10)' }}>
        <Reveal>
          <div style={{ marginBottom: 'var(--space-8)' }}>
            <SectionLabel index="08" onDark>
              Contact
            </SectionLabel>
          </div>
        </Reveal>
        <Reveal delay={0.05}>
          <h2 className="pf-display-lg" style={{ maxWidth: '16ch', marginBottom: 'var(--space-10)' }}>
            From idea to deploy.
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <a className="pf-email" data-cursor href="mailto:eng.johnnrc@gmail.com">
            eng.johnnrc@gmail.com
          </a>
        </Reveal>
        <Reveal delay={0.15}>
          <div className="pf-contact-meta">
            <a
              className="ds-label pf-contact-link"
              data-cursor
              href="https://www.linkedin.com/in/johnny-rodríguez-campos-2944292a5/"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: 'var(--paper)' }}
            >
              LinkedIn ↗
            </a>
            <a
              className="ds-label pf-contact-link"
              data-cursor
              href="https://github.com/rcJohnn"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: 'var(--paper)' }}
            >
              GitHub ↗
            </a>
            <span className="ds-label" style={{ color: 'var(--mist)' }}>
              Cartago · Costa Rica
            </span>
            <Badge dot tone="available" onDark>
              Available for projects
            </Badge>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
