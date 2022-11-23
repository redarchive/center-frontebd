import { Link } from 'gatsby'
import React, { useEffect, useState } from 'react'
import * as style from './style.module.scss'

const LoginLinks = (): JSX.Element => {
  const [query, setQuery] = useState('')

  useEffect(() => {
    setQuery(window.location.search)
  }, [])

  return (
    <div className={style.loginLinks}>
      <ul>
        <li><Link to={'/forgotpw' + query}>비밀번호 분실했어요</Link></li>
        <li><Link to={'/regist' + query}>회원가입</Link></li>
      </ul>
    </div>
  )
}

export default LoginLinks
