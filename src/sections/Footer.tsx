export function Footer() {
  return (
    <footer className="pf-footer">
      <div className="pf-container pf-footer__inner">
        <span className="pf-footer__logo">
          <img src="/images/logo-mark-light.webp" alt="Johnny Rodríguez" width={22} height={22} />
        </span>
        <span className="ds-label" style={{ color: 'var(--mist)' }}>
          © 2026 Johnny Rodríguez — Systems Engineer
        </span>
        <span className="ds-label" style={{ color: 'var(--mist)' }}>
          CALLSIGN · JR-AI-CR
        </span>
        <a className="pf-totop ds-label" data-cursor href="#top">
          ↑ Back to top
        </a>
      </div>
    </footer>
  )
}
