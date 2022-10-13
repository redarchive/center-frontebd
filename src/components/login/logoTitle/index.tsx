import React from 'react'
import Logo from './assets/symbol-logo.svg'
import * as style from './style.module.scss'
import { motion } from 'framer-motion'

const LoginLogoTitle = (): JSX.Element => {
  return (
    <div className={style.logoTitle}>
      <div className={style.logo}>
        <motion.img
          draggable={false}
          initial={{ rotate: '-60deg', scale: 2 }}
          animate={{ rotate: '0deg', scale: 1 }}
          src={Logo} />
      </div>
      <motion.h1 initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        로그인
      </motion.h1>
    </div>
  )
}

export default LoginLogoTitle
