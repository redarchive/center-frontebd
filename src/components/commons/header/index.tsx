import React from 'react'
import * as style from './style.module.scss'
import Logo from './assets/symbol-logo.svg'
import { Link } from 'gatsby'
import { useLocation } from '@reach/router'

interface Props {
  mode: boolean
  setMode: (v: boolean) => any
}

const Header = ({ mode, setMode }: Props): JSX.Element => {
  const location = useLocation()
  const url = new URL(location.href)

  const path = url.pathname
  const type = url.searchParams.get('type')

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
            <li className={path === '/' && style.click}><Link to="/">홈</Link></li>
            <li className={path === '/categories' && type === 'WEBSITE' && style.click}><Link to="/categories?type=WEBSITE">웹</Link></li>
            <li className={path === '/categories' && type === 'MOBILE' && style.click}><Link to="/categories?type=MOBILE">앱</Link></li>
            <li className={path === '/categories' && type === 'GAME' && style.click}><Link to="/categories?type=GAME">게임</Link></li>
            <li className={path === '/categories' && type === 'DESKTOP' && style.click}><Link to="/categories?type=DESKTOP">데스크톱</Link></li>
            <li className={path === '/categories' && type === 'PHYSICAL' && style.click}><Link to="/categories?type=PHYSICAL">IOT</Link></li>
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
            <div className={style.login}><Link to="/login?internal=%E2%9C%94&scope=openid">로그인</Link></div>
            <div className={style.sign__up}><Link to="/regist?internal=%E2%9C%94&scope=openid">회원가입</Link></div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Header
