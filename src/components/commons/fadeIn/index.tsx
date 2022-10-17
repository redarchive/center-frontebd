import { motion } from 'framer-motion'
import React, { ReactNode } from 'react'

interface Props {
  children: ReactNode
}

const FadeIn = ({ children }: Props): JSX.Element => {
  return (
    <motion.span
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}>
      {children}
    </motion.span>
  )
}

export default FadeIn
