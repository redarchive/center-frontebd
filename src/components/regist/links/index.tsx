import { Link } from 'gatsby'
import React, { useEffect, useState } from 'react'
import * as style from './style.module.scss'

const RegistLinks = (): JSX.Element => {
  const [query, setQuery] = useState('')

  useEffect(() => {
    setQuery(window.location.search)
  }, [])

  return (
    <div className={style.loginLinks}>
      <ul>
        <li><Link to={'/login' + query}>계정이 있으신가요? <u>로그인으로 이동</u></Link></li>
      </ul>
    </div>
  )
}

export default RegistLinks
