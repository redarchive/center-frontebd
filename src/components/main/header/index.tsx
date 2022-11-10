import React from 'react'
import * as style from './style.module.scss'
import Logo from './assets/symbol-logo.svg'
import { Link } from 'gatsby'

interface Props {
  mode: boolean
  setMode: (v: boolean) => any
}

const Header = ({ mode, setMode }: Props): JSX.Element => {
  return (
    <>
      <div className={style.back}></div>
      <div className={style.header}>
        <div onClick={() => setMode(!mode)} className={style.toggle}></div>
        <input type="checkbox" id="menu__btn" className={style.none}/>
        <label htmlFor="menu__btn" className={style.menu}></label>
        <div className={style.menu_back}></div>
        <div className={style.left}>
          <Link to='/' className={style.logo}>
            <img src={Logo} alt="logo" />
            <h1>Store</h1>
          </Link>
          <ul className={style.nav}>
            <li className={style.click}><Link to="/">홈</Link></li>
            <li><Link to="/">카테고리</Link></li>
            <li><Link to="/">앱</Link></li>
            <li><Link to="/">게임</Link></li>
            <li><Link to="/">학교 프로젝트</Link></li>
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
            <div className={style.login}><Link to="/">로그인</Link></div>
            <div className={style.sign__up}><Link to="/">회원가입</Link></div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Header
