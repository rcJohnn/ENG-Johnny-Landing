import type { Variants } from 'motion/react'

// Easing premium del design system — cubic-bezier(0.16, 1, 0.3, 1).
// Rápido al inicio, suave al llegar. Sin bounce. Es el --ease-premium de MASTER.md.
export const EASE_PREMIUM: [number, number, number, number] = [0.16, 1, 0.3, 1]

// Curva Apple/Linear alternativa (--ease-out).
export const EASE_OUT_EXPO: [number, number, number, number] = [0.22, 1, 0.36, 1]

// Reveal individual: fade + rise de --reveal-y (40px) en --dur-reveal (0.9s).
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.9, ease: EASE_PREMIUM } },
}

export const staggerParent: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06, delayChildren: 0.05 } },
}
