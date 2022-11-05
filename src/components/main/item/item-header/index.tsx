import React from 'react'
import * as style from './style.module.scss'

const Header = (): JSX.Element => {
  return (
    <div className={style.header}>
      <div className={style.left}>
        <h1 className={style.title}>3C 인증제 시스템</h1>
        <div className={style.sub}>만든이: 박민혁, 윤서쥰, 임준형, 김무일, 변예준</div>
      </div>
      <div className={style.right}>
        <a className={style.link}>이동하기</a>
      </div>
    </div>
  )
}

export default Header
