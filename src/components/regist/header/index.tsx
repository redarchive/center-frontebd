import React from 'react'
import { header as headerStyle } from './style.module.scss'

const RegistHeader = (): JSX.Element => {
  return (
    <header className={headerStyle}>
      <h1>통합 로그인 시스템</h1>
      <h2>하나의 아이디로 모든 서비스를 간편하게 이용하세요!</h2>
    </header>
  )
}

export default RegistHeader
