/**
 * Tag — micro-chip mono cuadrado para stack tecnológico y metadata.
 * Cuadrado, borde hairline, mucho tracking. Monocromático.
 */
interface TagProps {
  children: React.ReactNode
  onDark?: boolean
}

export function Tag({ children, onDark = false }: TagProps) {
  return <span className={`ds-tag${onDark ? ' ds-tag--on-dark' : ''}`}>{children}</span>
}
