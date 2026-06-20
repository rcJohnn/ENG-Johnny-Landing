// Iconos SVG del sistema. Stroke = currentColor, hereda el color del contenedor.

export type IconName = 'arrow' | 'arrow-up-right' | 'download'

const common = {
  width: 14,
  height: 14,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 2,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
}

export function ButtonIcon({ name }: { name: IconName }) {
  if (name === 'arrow-up-right') {
    return (
      <svg {...common}>
        <path d="M7 17 17 7" />
        <path d="M7 7h10v10" />
      </svg>
    )
  }
  if (name === 'download') {
    return (
      <svg {...common}>
        <path d="M12 3v12" />
        <path d="m7 10 5 5 5-5" />
        <path d="M5 21h14" />
      </svg>
    )
  }
  // arrow (default)
  return (
    <svg {...common}>
      <path d="M5 12h14" />
      <path d="m12 5 7 7-7 7" />
    </svg>
  )
}

// Flecha diagonal grande para las cards de proyectos.
export function ArrowUpRight() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <path d="M7 17 17 7" />
      <path d="M7 7h10v10" />
    </svg>
  )
}
