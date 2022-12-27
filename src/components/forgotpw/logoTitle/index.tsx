import React from 'react'
import * as style from './style.module.scss'
import { motion } from 'framer-motion'

const ForgotPWLogoTitle = (): JSX.Element => {
  return (
    <div className={style.logoTitle}>
      <motion.h1 initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        아이디 찾기 / 비밀번호 재설정
      </motion.h1>
    </div>
  )
}

export default ForgotPWLogoTitle
