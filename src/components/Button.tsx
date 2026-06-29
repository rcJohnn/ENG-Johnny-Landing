import { useCallback, useRef, useState } from 'react'
import { ButtonIcon, type IconName } from './icons'

/**
 * Button — the brand's primary action element.
 * Two signature behaviors: a subtle MAGNETIC pull toward the cursor,
 * and a SLIDE-FILL panel that enters from -101% on hover.
 * Monochrome by default; the `signal` variant uses the azure accent.
 */

type Variant = 'primary' | 'secondary' | 'ghost' | 'signal'
type Size = 'sm' | 'md' | 'lg'

interface ButtonProps {
  children: React.ReactNode
  variant?: Variant
  size?: Size
  icon?: IconName | null
  magnetic?: boolean
  href?: string
  target?: string
  rel?: string
  download?: boolean | string
  onClick?: () => void
}

// fg / bg / borde / color del fill / color del texto sobre el fill.
const palettes: Record<Variant, { fg: string; bg: string; bd: string; fill: string; fillFg: string }> = {
  primary:   { fg: 'var(--ink)',   bg: 'transparent',   bd: 'var(--ink)',       fill: 'var(--ink)',        fillFg: 'var(--paper)' },
  secondary: { fg: 'var(--paper)', bg: 'transparent',   bd: 'var(--line-dark)', fill: 'var(--paper)',      fillFg: 'var(--ink)' },
  ghost:     { fg: 'var(--graphite)', bg: 'transparent', bd: 'transparent',     fill: 'var(--signal-soft)', fillFg: 'var(--ink)' },
  signal:    { fg: 'var(--paper)', bg: 'var(--signal)', bd: 'var(--signal)',    fill: 'var(--signal-dim)', fillFg: 'var(--paper)' },
}

export function Button({
  children,
  variant = 'primary',
  size = 'md',
  icon = null,
  magnetic = true,
  href,
  target,
  rel,
  download,
  onClick,
}: ButtonProps) {
  const ref = useRef<HTMLAnchorElement | HTMLButtonElement>(null)
  const [t, setT] = useState({ x: 0, y: 0 })

  const onMove = useCallback(
    (e: React.MouseEvent) => {
      if (!magnetic || !ref.current) return
      if (window.matchMedia && window.matchMedia('(pointer: coarse)').matches) return
      const r = ref.current.getBoundingClientRect()
      const mx = e.clientX - (r.left + r.width / 2)
      const my = e.clientY - (r.top + r.height / 2)
      setT({ x: mx * 0.28, y: my * 0.34 })
    },
    [magnetic],
  )
  const reset = useCallback(() => setT({ x: 0, y: 0 }), [])

  const p = palettes[variant]
  const Tag = (href ? 'a' : 'button') as React.ElementType

  return (
    <Tag
      ref={ref}
      href={href}
      target={href ? target : undefined}
      rel={href ? rel : undefined}
      download={href ? download : undefined}
      onClick={onClick}
      onMouseMove={onMove}
      onMouseLeave={reset}
      className={`ds-btn ds-btn--${size}`}
      style={
        {
          color: p.fg,
          background: p.bg,
          border: `1px solid ${p.bd}`,
          transform: `translate(${t.x}px, ${t.y}px)`,
          // consumido por .ds-btn:hover .ds-btn__label
          '--_fillfg': p.fillFg,
        } as React.CSSProperties
      }
    >
      <span className="ds-btn__fill" aria-hidden="true" style={{ background: p.fill }} />
      <span className="ds-btn__label">
        {children}
        {icon && <ButtonIcon name={icon} />}
      </span>
    </Tag>
  )
}
