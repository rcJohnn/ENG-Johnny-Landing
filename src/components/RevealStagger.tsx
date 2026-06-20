import { motion } from 'motion/react'
import { staggerParent } from '../motion.presets'

interface RevealStaggerProps {
  children: React.ReactNode
  className?: string
}

// Los hijos deben ser <motion.div variants={fadeUp}> — heredan initial/whileInView del padre
export function RevealStagger({ children, className = '' }: RevealStaggerProps) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '-80px' }}
      variants={staggerParent}
    >
      {children}
    </motion.div>
  )
}
