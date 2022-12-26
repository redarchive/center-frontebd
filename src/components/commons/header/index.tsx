import React, { FormEvent, useEffect, useState } from 'react'
import * as style from './style.module.scss'
import Logo from './assets/symbol-logo.svg'
import { Link, navigate } from 'gatsby'
import { useLocation } from '@reach/router'
import { FaBars, FaSearch, FaYarn } from 'react-icons/fa'
import { toast } from 'react-hot-toast'

interface Props {
  mode: boolean
  setMode: (v: boolean) => any
}

const Header = ({ mode, setMode }: Props): JSX.Element => {
  const location = useLocation()
  const url = new URL(location.href ?? 'http://example.com')

  const path = url.pathname
  const [width, setWidth] = useState(window.innerWidth ?? 1920)
  const type = url.searchParams.get('type')

  const [me, setMe] = useState<any>(null)
  const [shadow, setShadow] = useState(false)
  const [query, setQuery] = useState('')

  useEffect(() => {
    void fetch('/api/users/@me')
      .then(async (res) => await res.json())
      .then((res) => {
        setMe(res.data?.me)
      })

    document.addEventListener('scroll', () => {
      setShadow(window.scrollY > 0)
    })

    window.onresize = () => {
      setWidth(window.innerWidth)
    }
  }, [])

  const onSearch = (e: FormEvent): void => {
    e.preventDefault()

    if (query.length === 0) {
      toast.error('검색어를 입력해 주세요.', {
        position: 'top-center'
      })
      return
    }

    if (query.length < 2) {
      toast.error('검색어는 두 글자 이상 입력해 주세요.', {
        position: 'top-center'
      })
      return
    }

    void navigate(`/search?query=${encodeURIComponent(query)}`)
  }

  const onLogout = (): void => {
    void fetch('/api/sessions/@this', {
      method: 'DELETE'
    }).then(() => {
      window.location.reload()
    })
  }

  const isNavHidden =
    ['/login', '/regist', '/forgotpw'].includes(path) &&
    url.searchParams.get('internal') !== '✔'

  if (isNavHidden) {
    return <></>
  }

  return (
    <>
      <label htmlFor='search__btn' className={style.back}></label>
      <div className={`${style.header as string} ${shadow ? (style.shadow as string) : ''}`}>
        <div onClick={() => setMode(!mode)} className={style.toggle}><FaYarn size={46} /></div>
        <input type="checkbox" id="menu__btn" className={style.none}/>
        <label htmlFor="menu__btn" className={style.menu}><FaBars size={28} /></label>
        <label htmlFor='menu__btn' className={style.menu_back}></label>
        <div className={style.left}>
          <Link to='/' className={style.logo}>
            <img src={Logo} alt="logo" />
            <h1>Archive</h1>
          </Link>
          <ul className={style.nav}>
            <li className={path === '/' && style.click}><Link to="/">홈</Link></li>
            <li className={path === '/categories' && type === 'WEBSITE' && style.click}><Link to="/categories?type=WEBSITE">웹사이트</Link></li>
            <li className={path === '/categories' && type === 'MOBILE' && style.click}><Link to="/categories?type=MOBILE">어플</Link></li>
            <li className={path === '/categories' && type === 'GAME' && style.click}><Link to="/categories?type=GAME">게임</Link></li>
            <li className={path === '/categories' && type === 'DESKTOP' && style.click}><Link to="/categories?type=DESKTOP">데스크톱</Link></li>
            <li className={path === '/categories' && type === 'PHYSICAL' && style.click}><Link to="/categories?type=PHYSICAL">IOT</Link></li>
          </ul>
        </div>
        <div className={style.right}>
          <div className={style.search}>
            <input type="checkbox" id="search__btn" className={style.none}/>
            <label htmlFor="search__btn" className={style.search__btn}>
              <FaSearch size={24} />
            </label>
            <form onSubmit={onSearch} className={style.search__box}>
              <input type="text" placeholder='검색어를 입력해주세요.' onChange={(e) => setQuery(e.target.value)} />
              <button type='submit'>
                <FaSearch size={20} />
              </button>
            </form>
              <label htmlFor='search__btn' className={style.search__back}></label>
          </div>
          <div className={style.links}>
            {me === undefined && (
              <>
                <div className={style.login}><Link to="/login?internal=%E2%9C%94&scope=openid">로그인</Link></div>
                <div className={style.sign__up}><Link to="/regist?internal=%E2%9C%94&scope=openid">회원가입</Link></div>
              </>
            )}

            {me !== null && me !== undefined && (
              <>
                {width < 768
                  ? <>
                    {/* === onMobile === */}
                    <div className={style.login}><strong>
                      <Link to={`/profile?id=${me.id as string}`}>
                        {me.nickname ?? me.person.name}
                      </Link></strong>&nbsp;
                      {me.person.type === 0 && '재학생'}
                      {me.person.type === 1 && '졸업생'}
                      {me.person.type === 2 && '교사'}
                    </div>
                    <div className={style.login} onClick={onLogout}><Link to="#logout">로그아웃</Link></div>
                  </>
                  : <>
                    {/* === onDesktop === */}
                    <div className={style.profile}>
                      <input type="checkbox" id="profile__img" className={style.none}/>
                      <label htmlFor="profile__img" className={style.profile__btn}>
                        <div className={style.profile__img}>
                          {me.profileImage
                            ? <img src={me.profileImage} />
                            : (me.nickname ?? me.person.name)[0]}</div>
                      </label>
                      <div className={style.profile__box}>
                        <Link to={`/profile?id=${me.id as number}`}><button>프로필보기</button></Link>
                        <Link to={`/profile?id=${me.id as number}#editprof`}><button>프로필수정</button></Link>
                        <button onClick={onLogout}>로그아웃</button>
                      </div>
                    </div>
                  </>}
                {me.person.type === 2 && <div className={style.login} onClick={onLogout}><Link to="/admin">관리</Link></div>}
                <div className={style.sign__up}><Link to={`/profile?id=${me.id as string}#new`}>신규등록</Link></div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  )
}

export default Header
