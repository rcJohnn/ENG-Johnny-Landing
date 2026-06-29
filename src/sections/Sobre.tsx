import { Reveal } from '../components/Reveal'
import { SectionLabel } from '../components/SectionLabel'
import { Counter } from '../components/Counter'

const DATA: { n: number | null; label: string; sig: boolean; text?: string }[] = [
  { n: 2, label: 'Projects in production', sig: true },
  { n: 3, label: 'Certifications', sig: false },
  { n: 4, label: 'Areas of expertise', sig: false },
  { n: null, label: 'Working method', sig: false, text: 'SDD' },
]

export function Sobre() {
  return (
    <section className="pf-section" id="about">
      <hr className="pf-rule" />
      <div className="pf-container" style={{ paddingTop: 'var(--space-10)' }}>
        <Reveal>
          <div style={{ marginBottom: 'var(--space-10)' }}>
            <SectionLabel index="02" onDark>
              About
            </SectionLabel>
          </div>
        </Reveal>

        <div className="pf-sobre-grid">
          <Reveal className="pf-portrait" >
            <div data-cursor>
              <picture>
                <source srcSet="/images/portrait.avif" type="image/avif" />
                <source srcSet="/images/portrait.webp" type="image/webp" />
                <img src="/images/portrait.webp" alt="Johnny Rodríguez" loading="lazy" decoding="async" width={619} height={989} />
              </picture>
              <span className="tint" aria-hidden="true" />
            </div>
          </Reveal>

          <div>
            <Reveal delay={0.05}>
              <h2 className="pf-display-lg" style={{ marginBottom: 'var(--space-6)' }}>
                Johnny
                <br />
                Rodríguez
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p
                style={{
                  maxWidth: 'var(--maxw-prose)',
                  color: 'var(--mist)',
                  fontSize: 'var(--fs-body-lg)',
                  marginBottom: 'var(--space-5)',
                }}
              >
                Systems engineer focused on applied AI, Azure Cloud and fullstack development.
                I build from the infrastructure up — networking, security, deployment — to the agents
                and models that run on top of it.
              </p>
            </Reveal>
            <Reveal delay={0.15}>
              <p style={{ maxWidth: 'var(--maxw-prose)', color: 'var(--mist)', marginBottom: 'var(--space-10)' }}>
                I work with a product mindset: what ships should hold up under load, fail gracefully
                and stay maintainable without heroics.
              </p>
            </Reveal>

            <hr className="pf-rule" style={{ marginBottom: 'var(--space-8)' }} />

            <Reveal delay={0.2}>
              <div className="pf-data">
                {DATA.map((d, i) => (
                  <div key={i}>
                    <div className={'num' + (d.sig ? ' sig' : '')}>
                      {d.text ? d.text : <Counter target={d.n as number} />}
                    </div>
                    <div className="ds-label" style={{ marginTop: 'var(--space-2)', color: 'var(--mist)' }}>
                      {d.label}
                    </div>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  )
}
