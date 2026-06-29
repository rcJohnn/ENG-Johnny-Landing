import { useState } from 'react'
import { Badge } from './Badge'
import { Button } from './Button'

const MAILTO =
  'mailto:eng.johnnrc@gmail.com' +
  '?subject=Project%20from%20your%20portfolio' +
  '&body=Hi%20Johnny%2C%0A%0AName%3A%20%0ACompany%20%2F%20Project%3A%20%0AInterest%3A%20%0A%0AThanks'

/**
 * NavBar — sticky header with blur, mono links, badge + CTA on desktop,
 * and a burger dropdown menu on mobile (<860px).
 */
interface NavBarProps {
  links?: string[]
  cta?: string
  onDark?: boolean
}

export function NavBar({
  links = ['About', 'Capabilities', 'Projects', 'Experience', 'Contact'],
  cta = "Let's talk",
  onDark = true,
}: NavBarProps) {
  const [open, setOpen] = useState(false)

  return (
    <header className="ds-nav">
      <nav className="ds-nav__inner">
        <a href="#top" className="ds-nav__logo" aria-label="Home">
          <img
            src={onDark ? '/images/logo-mark-light.webp' : '/images/logo-mark-dark.webp'}
            alt="Johnny Rodríguez"
            width={28}
            height={28}
            className="ds-nav__logo-mark"
          />
        </a>

        <ul className="ds-nav__links">
          {links.map((l) => (
            <li key={l}>
              <a href={`#${l.toLowerCase()}`} className="ds-nav__link">
                {l}
              </a>
            </li>
          ))}
        </ul>

        <div className="ds-nav__right">
          <Badge dot tone="available" onDark={onDark}>
            Available
          </Badge>
          <Button variant={onDark ? 'secondary' : 'primary'} size="sm" icon="arrow" href={MAILTO}>
            {cta}
          </Button>
        </div>

        <button
          className={`ds-nav__burger${open ? ' is-open' : ''}`}
          aria-label="Menu"
          aria-expanded={open}
          onClick={() => setOpen((o) => !o)}
        >
          <span />
          <span />
          <span />
        </button>
      </nav>

      <div className={`ds-nav__mobile${open ? ' is-open' : ''}`}>
        <ul>
          {links.map((l) => (
            <li key={l}>
              <a href={`#${l.toLowerCase()}`} onClick={() => setOpen(false)}>
                {l}
              </a>
            </li>
          ))}
          <li style={{ marginTop: 'var(--space-2)' }}>
            <Badge dot tone="available" onDark={onDark}>
              Available
            </Badge>
          </li>
        </ul>
      </div>
    </header>
  )
}
