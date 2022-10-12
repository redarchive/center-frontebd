import React from 'react'
import { LoginSelectableTypes } from '../typeSelector'
import Logo from './assets/symbol-logo.svg'
import * as style from './style.module.scss'
import { motion } from 'framer-motion'

interface Props {
  type: LoginSelectableTypes
}

const LogoTitle = ({ type }: Props): JSX.Element => {
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
        {type === LoginSelectableTypes.CURRENT_STUDENT && '재학생'}
        {type === LoginSelectableTypes.GRADUATED_STUDENT && '졸업생'}
        {type === LoginSelectableTypes.TEACHER && '교사'}
        &nbsp;로그인
      </motion.h1>
    </div>
  )
}

export default LogoTitle
