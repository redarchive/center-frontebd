import React from 'react'
import Logo from './assets/symbol-logo.svg'
import * as style from './style.module.scss'

const LogoTitle = (): JSX.Element => {
  return (
    <div className={style.logoTitle}>
      <div className={style.logo}>
        <img src={Logo} />
      </div>
      <h1>로그인</h1>
    </div>
  )
}

export default LogoTitle
