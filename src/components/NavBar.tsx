import { useState } from 'react'
import { Badge } from './Badge'
import { Button } from './Button'

/**
 * NavBar — header sticky con blur, links mono, badge + CTA en desktop,
 * y menú burger desplegable en mobile (<860px).
 */
interface NavBarProps {
  links?: string[]
  cta?: string
  onDark?: boolean
}

export function NavBar({
  links = ['Sobre', 'Capacidades', 'Proyectos', 'Trayectoria', 'Contacto'],
  cta = 'Hablemos',
  onDark = true,
}: NavBarProps) {
  const [open, setOpen] = useState(false)

  return (
    <header className="ds-nav">
      <nav className="ds-nav__inner">
        <a href="#top" className="ds-nav__logo" aria-label="Inicio">
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
            Disponible
          </Badge>
          <Button variant={onDark ? 'secondary' : 'primary'} size="sm" icon="arrow">
            {cta}
          </Button>
        </div>

        <button
          className={`ds-nav__burger${open ? ' is-open' : ''}`}
          aria-label="Menú"
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
              Disponible
            </Badge>
          </li>
        </ul>
      </div>
    </header>
  )
}
