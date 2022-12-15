import React from 'react'
import * as style from './style.module.scss'

export enum ItemListFilter {
  ALL,
  WEBSITE,
  APPLICATION,
  GAME,
  DESKTOP,
  PHYSICAL
}

interface Props {
  filter?: ItemListFilter
  items?: any[]
  isMe: boolean
  onFilterChange: (filter: ItemListFilter) => any
}

const ItemList = ({ isMe, filter = ItemListFilter.ALL, onFilterChange, items = [] }: Props): JSX.Element => {
  return (
    <div className={style.item__list}>
      <div className={style.categorys}>
        <div onClick={() => onFilterChange(ItemListFilter.ALL)} className={filter === ItemListFilter.ALL ? style.click : style.category}>전체보기 ({items.length})</div>
        <div onClick={() => onFilterChange(ItemListFilter.WEBSITE)} className={filter === ItemListFilter.WEBSITE ? style.click : style.category}>웹사이트 ({items.filter((v) => v.type === 0).length})</div>
        <div onClick={() => onFilterChange(ItemListFilter.APPLICATION)} className={filter === ItemListFilter.APPLICATION ? style.click : style.category}>어플 ({items.filter((v) => v.type === 1).length})</div>
        <div onClick={() => onFilterChange(ItemListFilter.GAME)} className={filter === ItemListFilter.GAME ? style.click : style.category}>게임 ({items.filter((v) => v.type === 2).length})</div>
        <div onClick={() => onFilterChange(ItemListFilter.DESKTOP)} className={filter === ItemListFilter.DESKTOP ? style.click : style.category}>데스크톱 ({items.filter((v) => v.type === 3).length})</div>
        <div onClick={() => onFilterChange(ItemListFilter.PHYSICAL)} className={filter === ItemListFilter.PHYSICAL ? style.click : style.category}>IOT ({items.filter((v) => v.type === 4).length})</div>
      </div>
      <div className={style.card__box}>
        {isMe && (
          <div className={style.card}>
            <a href='#new' className={style.create}>
              등록하기
            </a>
          </div>
        )}

        {items.filter((v) => ItemListFilter[ItemListFilter[filter] as any] as any === 0 || v.type === ItemListFilter[ItemListFilter[filter] as any] as any - 1).map((v, i) => (
          <div className={style.card} key={i}>
            <a href={`#${v.id as number}`} className={style.main}>
              <div className={style.pc}><img src={v.promotionImageUrl} width={300} /></div>
              <div className={style.title}>
                <div>{v.name}</div>
              </div>
            </a>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ItemList
