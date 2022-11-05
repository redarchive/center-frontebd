import React from 'react'
import * as style from './style.module.scss'
import Logo from './assets/symbol-logo.svg'

interface Props {
  mode: boolean
  setMode: (v: boolean) => any
}

const Header = ({ mode, setMode }: Props): JSX.Element => {
  return (
    <div className={style.header}>
      <div onClick={() => setMode(!mode)} className={style.toggle}></div>
      <input type="checkbox" id="menu__btn" className={style.none}/>
      <label htmlFor="menu__btn" className={style.menu}></label>
      <div className={style.menu_back}></div>
      <div className={style.left}>
        <a href='/' className={style.logo}>
          <img src={Logo} alt="logo" />
          <h1>Store</h1>
        </a>
        <ul className={style.nav}>
          <li className={style.click}><a href="/">홈</a></li>
          <li><a href="/">카테고리</a></li>
          <li><a href="/">앱</a></li>
          <li><a href="/">게임</a></li>
          <li><a href="/">학교 프로젝트</a></li>
        </ul>
      </div>
      <div className={style.right}>
        <div className={style.search}>
          <input type="checkbox" id="search__btn" className={style.none}/>
          <label htmlFor="search__btn" className={style.search__btn}></label>
          <form action="/" className={style.search__box}>
            <input type="text" placeholder='검색어를 입력해주세요.' required />
            <button type='submit'></button>
          </form>
          <div className={style.search__back}></div>
        </div>
        <div className={style.links}>
          <div className={style.login}><a href="/">로그인</a></div>
          <div className={style.sign__up}><a href="/">회원가입</a></div>
        </div>
      </div>
    </div>
  )
}

export default Header
