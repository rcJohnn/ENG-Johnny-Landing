import { Reveal } from '../components/Reveal'
import { SectionLabel } from '../components/SectionLabel'

const QUOTES = [
  { who: '— Referencia 01', role: 'Tech Lead', text: 'Texto de referencia pendiente. Resalta criterio técnico y capacidad de ejecución bajo presión.' },
  { who: '— Referencia 02', role: 'Product', text: 'Texto de referencia pendiente. Enfatiza colaboración y traducción de necesidad a sistema.' },
  { who: '— Referencia 03', role: 'Cliente', text: 'Texto de referencia pendiente. Destaca confiabilidad y resultado entregado.' },
]

export function Referencias() {
  return (
    <section className="pf-section" id="referencias">
      <hr className="pf-rule" />
      <div className="pf-container" style={{ paddingTop: 'var(--space-10)', paddingBottom: 'var(--space-8)' }}>
        <Reveal>
          <SectionLabel index="07" onDark>
            Referencias
          </SectionLabel>
        </Reveal>
      </div>
      <div className="pf-container">
        <div className="pf-quotes">
          {QUOTES.map((q, i) => (
            <Reveal key={i} delay={i * 0.07} className="pf-quote">
              <p style={{ marginBottom: 'var(--space-6)' }}>{q.text}</p>
              <div className="ds-label" style={{ color: 'var(--paper)' }}>
                {q.who}
              </div>
              <div className="ds-label" style={{ color: 'var(--mist)', marginTop: 'var(--space-1)' }}>
                {q.role}
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
