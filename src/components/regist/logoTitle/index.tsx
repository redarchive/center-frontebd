import React from 'react'
import { RegistSelectableTypes } from '../typeSelector'
import * as style from './style.module.scss'
import { motion } from 'framer-motion'

interface Props {
  type: RegistSelectableTypes
}

const RegistLogoTitle = ({ type }: Props): JSX.Element => {
  return (
    <div className={style.logoTitle}>
      <motion.h1 initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        {type === RegistSelectableTypes.CURRENT_STUDENT && '재학생'}
        {type === RegistSelectableTypes.TEACHER && '교사'}
        &nbsp;회원가입
      </motion.h1>
    </div>
  )
}

export default RegistLogoTitle
