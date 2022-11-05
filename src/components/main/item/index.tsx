import React from 'react'
import ItemHeader from './item-header'
import ItemSlide from './item-slide'
import ItemTextbox from './item-textbox'
import * as style from './style.module.scss'
import ItemGraph from './item-graph/index'

interface Props {
  item: boolean
  setItem: (v: boolean) => any
}

const Item = ({ item, setItem }: Props): JSX.Element => {
  return (
    <div className={style.item__back}>
      <div className={style.item__container}>
        <ItemHeader />
        <ItemSlide />
        <ItemTextbox />
        <ItemGraph />
      </div>
    </div>
  )
}

export default Item
