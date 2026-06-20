import { motion } from 'motion/react'
import { EASE_PREMIUM } from '../motion.presets'

interface RevealProps {
  children: React.ReactNode
  className?: string
  delay?: number
}

// Reveal individual: fade + rise (--reveal-y 40px) con el ease premium del DS.
export function Reveal({ children, className = '', delay = 0 }: RevealProps) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '-8% 0px' }}
      variants={{
        hidden: { opacity: 0, y: 40 },
        show: { opacity: 1, y: 0, transition: { duration: 0.9, ease: EASE_PREMIUM, delay } },
      }}
    >
      {children}
    </motion.div>
  )
}
