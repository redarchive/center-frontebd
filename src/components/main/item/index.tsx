import React from 'react'
import ItemHeader from './item-header'
import ItemSlide from './item-slide'
import ItemTextbox from './item-textbox'
import * as style from './style.module.scss'
import ItemGraph from './item-graph/index'

const Item = (): JSX.Element => {
  return (
    <>
      <a href='#closed' className={style.item__back}></a>
      <div className={style.item__container}>
        <a href='#closed' className={style.clear}>1</a>
        <ItemHeader />
        <ItemSlide />
        <ItemTextbox />
        <ItemGraph />
      </div>
    </>
  )
}

export default Item
