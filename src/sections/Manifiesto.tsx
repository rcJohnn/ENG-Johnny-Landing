import { Reveal } from '../components/Reveal'
import { SectionLabel } from '../components/SectionLabel'

export function Manifiesto() {
  return (
    <section className="pf-section pf-manifesto" id="manifesto">
      <div className="pf-container">
        <Reveal>
          <div style={{ marginBottom: 'var(--space-8)' }}>
            <SectionLabel index="01" onDark>
              Manifesto
            </SectionLabel>
          </div>
        </Reveal>
        <Reveal delay={0.05}>
          <p>
            <span className="dim">The system isn't the code.</span>{' '}
            <span className="em">It's the decision that it will scale, survive, and never wake anyone up at 3 a.m.</span>
          </p>
        </Reveal>
      </div>
    </section>
  )
}
