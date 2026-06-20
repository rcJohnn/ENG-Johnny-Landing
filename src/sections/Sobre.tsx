import { Reveal } from '../components/Reveal'
import { SectionLabel } from '../components/SectionLabel'
import { Counter } from '../components/Counter'

const DATA: { n: number | null; label: string; sig: boolean; text?: string }[] = [
  { n: 4, label: 'Dominios', sig: false },
  { n: 3, label: 'Certificaciones', sig: true },
  { n: 2, label: 'Capas — red & modelo', sig: false },
  { n: null, label: 'Costa Rica', sig: false, text: 'CR' },
]

export function Sobre() {
  return (
    <section className="pf-section" id="sobre">
      <hr className="pf-rule" />
      <div className="pf-container" style={{ paddingTop: 'var(--space-10)' }}>
        <Reveal>
          <div style={{ marginBottom: 'var(--space-10)' }}>
            <SectionLabel index="02" onDark>
              Sobre
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
                Ingeniero de sistemas enfocado en IA aplicada, Azure Cloud y desarrollo fullstack.
                Construyo desde la infraestructura — redes, seguridad, despliegue — hasta los agentes
                y modelos que corren encima.
              </p>
            </Reveal>
            <Reveal delay={0.15}>
              <p style={{ maxWidth: 'var(--maxw-prose)', color: 'var(--mist)', marginBottom: 'var(--space-10)' }}>
                Trabajo con criterio de producto: que lo que se entrega resista carga, falle con gracia
                y se pueda mantener sin heroísmos.
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
