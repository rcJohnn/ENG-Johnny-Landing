import { motion } from 'motion/react'
import { Reveal } from '../components/Reveal'
import { RevealStagger } from '../components/RevealStagger'
import { SectionLabel } from '../components/SectionLabel'
import { Tag } from '../components/Tag'
import { fadeUp } from '../motion.presets'

const ITEMS = [
  { n: '01', title: 'AI & Agent Development', desc: 'Agent-assisted AI development using Spec-Driven Development (SDD) and the Gentle AI ecosystem with persistent memory.', tags: ['Claude Code', 'Gentle AI', 'SDD', 'Higgsfield AI'] },
  { n: '02', title: 'Cloud & Deployment', desc: 'Provisioning, configuring and monitoring Azure and Vercel environments. CI/CD, secrets and cost management in production.', tags: ['Azure', 'Vercel', 'GitHub Actions', 'App Service'] },
  { n: '03', title: 'Infrastructure & Email', desc: 'DNS on Cloudflare and Namecheap, custom email with full inbound/outbound coverage from owned domains.', tags: ['Cloudflare', 'Resend', 'ImprovMX', 'Gmail SMTP'] },
  { n: '04', title: 'Networking & Security', desc: 'Installation and configuration of enterprise network infrastructure. 2FA, corporate identity and topology design.', tags: ['Cisco Meraki', 'CompTIA Security+', 'CCNA', '2FA'] },
]

export function Capacidades() {
  return (
    <section className="pf-section" id="capabilities">
      <hr className="pf-rule" />
      <div className="pf-container" style={{ paddingTop: 'var(--space-10)' }}>
        <Reveal>
          <div style={{ marginBottom: 'var(--space-10)' }}>
            <SectionLabel index="03" onDark>
              Capabilities
            </SectionLabel>
          </div>
        </Reveal>
      </div>
      <div className="pf-container">
        <RevealStagger className="pf-cap-grid">
          {ITEMS.map((it) => (
            <motion.div className="pf-cap-cell" variants={fadeUp} key={it.n} data-cursor>
              <div className="ds-label" style={{ color: 'var(--mist)', marginBottom: 'var(--space-6)' }}>
                /{it.n}
              </div>
              <h3 className="pf-display-md" style={{ marginBottom: 'var(--space-4)' }}>
                {it.title}
              </h3>
              <p style={{ color: 'var(--mist)', maxWidth: '34ch', marginBottom: 'var(--space-6)' }}>{it.desc}</p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-2)' }}>
                {it.tags.map((t) => (
                  <Tag key={t} onDark>
                    {t}
                  </Tag>
                ))}
              </div>
            </motion.div>
          ))}
        </RevealStagger>
      </div>
    </section>
  )
}
