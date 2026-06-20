import { Reveal } from '../components/Reveal'
import { SectionLabel } from '../components/SectionLabel'

export function Manifiesto() {
  return (
    <section className="pf-section pf-manifesto" id="manifiesto">
      <div className="pf-container">
        <Reveal>
          <div style={{ marginBottom: 'var(--space-8)' }}>
            <SectionLabel index="01" onDark>
              Manifiesto
            </SectionLabel>
          </div>
        </Reveal>
        <Reveal delay={0.05}>
          <p>
            <span className="dim">El sistema no es el código.</span>{' '}
            <span className="em">Es la decisión de que escale, sobreviva y no despierte a nadie a las 3 a.m.</span>
          </p>
        </Reveal>
      </div>
    </section>
  )
}
