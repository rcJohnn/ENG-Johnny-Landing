import { Reveal } from '../components/Reveal'
import { SectionLabel } from '../components/SectionLabel'

const TIMELINE = [
  { active: true, period: '2024 — Presente', role: 'NutrisSys', note: 'Arquitectura de plataforma e integración de IA. Diseño cloud, datos y front.' },
  { active: false, period: '2022 — 2024', role: 'PBS', note: 'Desarrollo fullstack y soporte de infraestructura. Redes, despliegue y mantenimiento.' },
]

const EDU = [
  { title: 'Ingeniería en Sistemas', note: 'Formación en arquitectura, redes y desarrollo de software.' },
  { title: 'Azure · Certificaciones cloud', note: 'Fundamentos y administración sobre Azure.' },
  { title: 'IA aplicada & Agentes', note: 'Especialización en LLMs, RAG y orquestación de agentes.' },
]

export function Trayectoria() {
  return (
    <section className="pf-section" id="trayectoria">
      <hr className="pf-rule" />
      <div className="pf-container" style={{ paddingTop: 'var(--space-10)' }}>
        <Reveal>
          <div style={{ marginBottom: 'var(--space-10)' }}>
            <SectionLabel index="06" onDark>
              Trayectoria
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
                Educación · Certificaciones
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
