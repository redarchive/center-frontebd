import React from 'react'
import * as style from './style.module.scss'
import { motion } from 'framer-motion'

const RegistLogoTitle = (): JSX.Element => {
  return (
    <div className={style.logoTitle}>
      <motion.h1 initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        회원가입
      </motion.h1>
    </div>
  )
}

export default RegistLogoTitle
