import { Reveal } from '../components/Reveal'
import { SectionLabel } from '../components/SectionLabel'

const TIMELINE = [
  { active: true, period: 'Feb 2026 — Present', role: 'NutriSys', note: 'Technical Lead & Product Owner. System architecture, generative AI supervision, Azure environment management and end-to-end CI/CD pipeline.' },
  { active: false, period: 'May 2025 — Jan 2026', role: 'PBS', note: 'Network Technician. Installation and configuration of Cisco Meraki MX250/MX95 infrastructure, 2FA implementation and corporate identity management.' },
]

const EDU = [
  { title: 'Systems Engineering', note: 'Universidad Americana — San José, Costa Rica.' },
  { title: 'CompTIA Security+', note: 'Cybersecurity certification — TECNASA.' },
  { title: 'Cisco CCNA 1 & 2', note: 'Routing & Switching — Universidad Castro Carazo.' },
  { title: 'AZ-900 Azure Fundamentals', note: 'Microsoft Azure — In progress.' },
]

export function Trayectoria() {
  return (
    <section className="pf-section" id="experience">
      <hr className="pf-rule" />
      <div className="pf-container" style={{ paddingTop: 'var(--space-10)' }}>
        <Reveal>
          <div style={{ marginBottom: 'var(--space-10)' }}>
            <SectionLabel index="06" onDark>
              Experience
            </SectionLabel>
          </div>
        </Reveal>

        <div className="pf-tray-grid">
          <div className="pf-timeline">
            {TIMELINE.map((t, i) => (
              <Reveal key={i} delay={i * 0.08} className={'pf-tl-item' + (t.active ? ' active' : '')}>
                <div className="ds-label" style={{ color: t.active ? 'var(--signal)' : 'var(--mist)', marginBottom: 'var(--space-2)' }}>
                  {t.period}
                </div>
                <h3 className="pf-display-md" style={{ marginBottom: 'var(--space-3)' }}>
                  {t.role}
                </h3>
                <p style={{ color: 'var(--mist)', maxWidth: '40ch' }}>{t.note}</p>
              </Reveal>
            ))}
          </div>

          <div>
            <Reveal>
              <div className="ds-label" style={{ color: 'var(--mist)', marginBottom: 'var(--space-6)' }}>
                Education · Certifications
              </div>
            </Reveal>
            {EDU.map((e, i) => (
              <Reveal key={i} delay={i * 0.06} className="pf-edu-item">
                <h4>{e.title}</h4>
                <p style={{ color: 'var(--mist)', fontSize: 'var(--fs-body-sm)' }}>{e.note}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
