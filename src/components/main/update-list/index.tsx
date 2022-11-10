import React from 'react'
import * as style from './style.module.scss'
import { Link } from 'gatsby'

const Update = (): JSX.Element => {
  return (
    <div className={style.update}>
      <div className={style.title}>업데이트</div>
      <div className={style.categorys}>
        <div className={style.click}>전체보기</div>
        <div className={style.category}>앱</div>
        <div className={style.category}>인공지능</div>
        <div className={style.category}>게임</div>
      </div>
      <div className={style.card__box}>
        <div className={style.card}>
          <Link to='/' className={style.main}>
            <div className={style.mobile}></div>
          </Link>
          <div className={style.sub}>
            <div className={style.profile}>
              <div className={style.profile__img}>김</div>
              <div className={style.profile__name}>김무일</div>
            </div>
            <div className={style.day}>2022.01.10</div>
          </div>
        </div>
        <div className={style.card}>
          <Link to='/' className={style.main}>
            <div className={style.mobile}></div>
          </Link>
          <div className={style.sub}>
            <div className={style.profile}>
              <div className={style.profile__img}>김</div>
              <div className={style.profile__name}>김무일</div>
            </div>
            <div className={style.day}>2022.01.10</div>
          </div>
        </div>
        <div className={style.card}>
          <Link to='/' className={style.main}>
            <div className={style.mobile}></div>
          </Link>
          <div className={style.sub}>
            <div className={style.profile}>
              <div className={style.profile__img}>김</div>
              <div className={style.profile__name}>김무일</div>
            </div>
            <div className={style.day}>2022.01.10</div>
          </div>
        </div>
        <div className={style.card}>
          <Link to='/' className={style.main}>
            <div className={style.pc}></div>
          </Link>
          <div className={style.sub}>
            <div className={style.profile}>
              <div className={style.profile__img}>김</div>
              <div className={style.profile__name}>김무일</div>
            </div>
            <div className={style.day}>2022.01.10</div>
          </div>
        </div>
        <div className={style.card}>
          <Link to='/' className={style.main}>
            <div className={style.pc}></div>
          </Link>
          <div className={style.sub}>
            <div className={style.profile}>
              <div className={style.profile__img}>김</div>
              <div className={style.profile__name}>김무일</div>
            </div>
            <div className={style.day}>2022.01.10</div>
          </div>
        </div>
        <div className={style.card}>
          <Link to='/' className={style.main}>
            <div className={style.mobile}></div>
          </Link>
          <div className={style.sub}>
            <div className={style.profile}>
              <div className={style.profile__img}>김</div>
              <div className={style.profile__name}>김무일</div>
            </div>
            <div className={style.day}>2022.01.10</div>
          </div>
        </div>
        <div className={style.card}>
          <Link to='/' className={style.main}>
            <div className={style.pc}></div>
          </Link>
          <div className={style.sub}>
            <div className={style.profile}>
              <div className={style.profile__img}>김</div>
              <div className={style.profile__name}>김무일</div>
            </div>
            <div className={style.day}>2022.01.10</div>
          </div>
        </div>
        <div className={style.card}>
          <Link to='/' className={style.main}>
            <div className={style.pc}></div>
          </Link>
          <div className={style.sub}>
            <div className={style.profile}>
              <div className={style.profile__img}>김</div>
              <div className={style.profile__name}>김무일</div>
            </div>
            <div className={style.day}>2022.01.10</div>
          </div>
        </div>
        <div className={style.card}>
          <Link to='/' className={style.main}>
            <div className={style.pc}></div>
          </Link>
          <div className={style.sub}>
            <div className={style.profile}>
              <div className={style.profile__img}>김</div>
              <div className={style.profile__name}>김무일</div>
            </div>
            <div className={style.day}>2022.01.10</div>
          </div>
        </div>
      </div>
      <div className={style.update__btn}>
        <a href="/">더 알아보기</a>
      </div>
    </div>
  )
}

export default Update
