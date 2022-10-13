import React from 'react'
import { header as headerStyle } from './style.module.scss'

const ForgotPWHeader = (): JSX.Element => {
  return (
    <header className={headerStyle}>
      <h1>비밀번호를 잊으셨나요?</h1>
      <h2>걱정마세요! 저희가 당신을 위해 재설정 해드릴께요.</h2>
    </header>
  )
}

export default ForgotPWHeader
