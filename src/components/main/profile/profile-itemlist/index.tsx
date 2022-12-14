import React from 'react'
import * as style from './style.module.scss'

const ItemList = (): JSX.Element => {
  return (
    <div className={style.item__list}>
      <div className={style.categorys}>
        <div className={style.click}>전체보기</div>
        <div className={style.category}>반응형</div>
        <div className={style.category}>PC</div>
        <div className={style.category}>모바일</div>
        <div className={style.category}>앱</div>
        <div className={style.category}>인공지능</div>
        <div className={style.category}>게임</div>
      </div>
      <div className={style.card__box}>
        <div className={style.card}>
          <a href="#1" className={style.main}>
            <div className={style.pc}></div>
          </a>
        </div>
        <div className={style.card}>
          <a href="#1" className={style.main}>
            <div className={style.pc}></div>
          </a>
        </div>
        <div className={style.card}>
          <a href="#1" className={style.main}>
            <div className={style.pc}></div>
          </a>
        </div>
        <div className={style.card}>
          <a href="#1" className={style.main}>
            <div className={style.mobile}></div>
          </a>
        </div>
        <div className={style.card}>
          <a href="#1" className={style.main}>
            <div className={style.mobile}></div>
          </a>
        </div>
        <div className={style.card}>
          <a href="#1" className={style.main}>
            <div className={style.mobile}></div>
          </a>
        </div>
        <div className={style.card}>
          <a href="#1" className={style.main}>
            <div className={style.mobile}></div>
          </a>
        </div>
        <div className={style.card}>
          <a href="#1" className={style.main}>
            <div className={style.pc}></div>
          </a>
        </div>
      </div>
    </div>
  )
}

export default ItemList
