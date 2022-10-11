import React from 'react'
import { header as headerStyle } from './style.module.scss'

const LoginHeader = (): JSX.Element => {
  return (
    <header className={headerStyle}>
      <h1>{'...'}으로 로그인합니다.</h1>
      <h2>요청한 정보: {'..., ..., ...'}</h2>
    </header>
  )
}

export default LoginHeader
