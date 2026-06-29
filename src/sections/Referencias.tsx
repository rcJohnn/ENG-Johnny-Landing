import { Reveal } from '../components/Reveal'
import { SectionLabel } from '../components/SectionLabel'

const STEPS = [
  {
    n: '01',
    title: 'Specification',
    text: 'Before writing code: requirements, architecture and scope defined with Spec-Driven Development (SDD). The system exists on paper before it exists in production.',
  },
  {
    n: '02',
    title: 'AI session',
    text: 'Agentic sessions with Gentle AI and persistent memory (Engram). Active supervision of every generated output — I direct, the AI executes. Technical review before moving forward.',
  },
  {
    n: '03',
    title: 'Real production',
    text: 'Deploy to Azure or Vercel, CI/CD with GitHub Actions, secure secrets, domain, email and cost monitoring. Nothing ships until it works under load and fails gracefully.',
  },
]

export function Referencias() {
  return (
    <section className="pf-section" id="process">
      <hr className="pf-rule" />
      <div className="pf-container" style={{ paddingTop: 'var(--space-10)', paddingBottom: 'var(--space-8)' }}>
        <Reveal>
          <SectionLabel index="07" onDark>
            Process
          </SectionLabel>
        </Reveal>
      </div>
      <div className="pf-container">
        <div className="pf-quotes">
          {STEPS.map((s, i) => (
            <Reveal key={i} delay={i * 0.07} className="pf-quote">
              <div className="ds-label" style={{ color: 'var(--signal)', marginBottom: 'var(--space-4)' }}>
                /{s.n}
              </div>
              <h3 className="pf-display-md" style={{ marginBottom: 'var(--space-4)' }}>
                {s.title}
              </h3>
              <p>{s.text}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
