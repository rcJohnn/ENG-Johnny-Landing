/**
 * SectionLabel — el marcador editorial de encabezado de sección: un índice
 * mono como [02] con subrayado azure, seguido del nombre de la sección.
 * Abre cada sección mayor del portfolio.
 */
interface SectionLabelProps {
  index?: string // "02"
  children: React.ReactNode // "Sobre"
  onDark?: boolean
}

export function SectionLabel({ index, children, onDark = false }: SectionLabelProps) {
  return (
    <span className={`ds-seclabel${onDark ? ' ds-seclabel--on-dark' : ''}`}>
      {index != null && <span className="ds-seclabel__index">[{index}]</span>}
      <span className="ds-seclabel__name">{children}</span>
    </span>
  )
}
