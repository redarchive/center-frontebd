import React from 'react'
import * as style from './style.module.scss'
import { Link } from 'gatsby'

const Header = (): JSX.Element => {
  return (
    <div className={style.header}>
      <div className={style.left}>
        <div className={style.iamge}>김</div>
        <div className={style.txt}>
          <div className={style.name}>김무일</div>
          <div className={style.sub}>front-end</div>
        </div>
      </div>
      <div className={style.right}>
        <Link to='' className={style.btn}>프로필 수정</Link>
      </div>
    </div>
  )
}

export default Header
