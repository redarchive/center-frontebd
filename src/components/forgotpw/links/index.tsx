import { Link } from 'gatsby'
import React from 'react'
import * as style from './style.module.scss'

const ForgotPWLinks = (): JSX.Element => {
  return (
    <div className={style.loginLinks}>
      <ul>
        <li><Link to={'/login' + window.location.search}>잘못 들어오셨나요? <u>로그인으로 이동</u></Link></li>
      </ul>
    </div>
  )
}

export default ForgotPWLinks
