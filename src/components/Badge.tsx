/**
 * Badge — chip de estado mono. Punto azure pulsante opcional.
 * tone "available" → punto azure pulsante · "neutral" → punto mist estático.
 */
interface BadgeProps {
  children: React.ReactNode
  dot?: boolean
  tone?: 'available' | 'neutral'
  onDark?: boolean
}

export function Badge({ children, dot = false, tone = 'available', onDark = false }: BadgeProps) {
  return (
    <span className={`ds-badge${onDark ? ' ds-badge--on-dark' : ''}`}>
      {dot && <span className={`ds-badge__dot ds-badge__dot--${tone}`} aria-hidden="true" />}
      {children}
    </span>
  )
}
