import { Reveal } from '../components/Reveal'
import { SectionLabel } from '../components/SectionLabel'

const STACK = [
  'React', 'TypeScript', 'Python', 'C#', '.NET Core', 'Azure', 'Docker', 'Kubernetes',
  'SSMS', 'LangChain', 'OpenAI', 'Claude', 'Linux', 'FastAPI', 'Git',
]

function Row() {
  return (
    <div className="pf-track" aria-hidden="true">
      {STACK.map((s, i) => (
        <span key={i} style={{ display: 'contents' }}>
          <span className="item">{s}</span>
          <span className="dot">●</span>
        </span>
      ))}
    </div>
  )
}

export function Arsenal() {
  return (
    <section className="pf-section" id="arsenal">
      <hr className="pf-rule" />
      <div className="pf-container" style={{ paddingTop: 'var(--space-10)', paddingBottom: 'var(--space-8)' }}>
        <Reveal>
          <SectionLabel index="05" onDark>
            Arsenal
          </SectionLabel>
        </Reveal>
      </div>
      <div className="pf-marquee">
        <Row />
        <Row />
      </div>
    </section>
  )
}
