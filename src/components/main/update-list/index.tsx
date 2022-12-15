import React, { useState } from 'react'
import * as style from './style.module.scss'
import { Link } from 'gatsby'
import moment from 'moment'

export enum ItemListFilter {
  ALL,
  WEBSITE,
  APPLICATION,
  GAME,
  DESKTOP,
  PHYSICAL
}

const Update = ({ data, onNext, disabled }: any): JSX.Element => {
  const [filter, setFilter] = useState<ItemListFilter>(ItemListFilter.ALL)

  return (
    <div className={style.update}>
      <div className={style.title}>업데이트</div>
      <div className={style.categorys}>
        <div onClick={() => setFilter(ItemListFilter.ALL)} className={filter === ItemListFilter.ALL ? style.click : style.category}>전체보기</div>
        <div onClick={() => setFilter(ItemListFilter.WEBSITE)} className={filter === ItemListFilter.WEBSITE ? style.click : style.category}>웹사이트</div>
        <div onClick={() => setFilter(ItemListFilter.APPLICATION)} className={filter === ItemListFilter.APPLICATION ? style.click : style.category}>어플</div>
        <div onClick={() => setFilter(ItemListFilter.GAME)} className={filter === ItemListFilter.GAME ? style.click : style.category}>게임</div>
        <div onClick={() => setFilter(ItemListFilter.DESKTOP)} className={filter === ItemListFilter.DESKTOP ? style.click : style.category}>데스크톱</div>
        <div onClick={() => setFilter(ItemListFilter.PHYSICAL)} className={filter === ItemListFilter.PHYSICAL ? style.click : style.category}>IOT</div>
      </div>
      <div className={style.card__box}>
        {data?.recents.filter((v: any) => ItemListFilter[ItemListFilter[filter] as any] as any === 0 || v.type === ItemListFilter[ItemListFilter[filter] as any] as any - 1).map((v: any, i: number) => (
            <div className={style.card} key={i}>
            <Link to={`/#${v.id as number}`} className={style.main}>
              <div className={style.pc}><img src={v.promotionImageUrl} width={300} /></div>
              <div className={style.title}>
                <div>{v.name}</div>
              </div>
            </Link>
            <div className={style.sub}>
              <div className={style.profile}>
                <div className={style.profile__img}>{v.profileImage ? <img src={v.profileImage} /> : (v.user.nickname ?? v.user.person.name)[0]}</div>
                <div className={style.profile__name}>{v.user.nickname ?? v.user.person.name}</div>
              </div>
              <div className={style.day}>{moment(v.createdAt).format('YYYY.MM.DD')}</div>
            </div>
          </div>
        ))}
      </div>
      {!disabled && (
        <div className={style.update__btn}>
          <button onClick={onNext}>더 알아보기</button>
        </div>
      )}
    </div>
  )
}

export default Update
