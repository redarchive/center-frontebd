import { motion } from 'framer-motion'
import React, { ReactNode } from 'react'

interface Props {
  children: ReactNode
}

const FadeIn = ({ children }: Props): JSX.Element => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}>
      {children}
    </motion.div>
  )
}

export default FadeIn
