import { Link } from 'gatsby'
import React from 'react'
import * as style from './style.module.scss'

const LoginLinks = (): JSX.Element => {
  return (
    <div className={style.loginLinks}>
      <ul>
        <li><Link to={'/forgotpw' + window.location.search}>비밀번호 분실했어요</Link></li>
        <li><Link to={'/regist' + window.location.search}>회원가입</Link></li>
      </ul>
    </div>
  )
}

export default LoginLinks
