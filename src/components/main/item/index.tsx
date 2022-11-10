import React from 'react'
import { Link } from 'gatsby'
import ItemHeader from './item-header'
import ItemSlide from './item-slide'
import ItemTextbox from './item-textbox'
import * as style from './style.module.scss'
import ItemGraph from './item-graph/index'

const Item = (): JSX.Element => {
  return (
    <>
      <Link to='/' className={style.item__back}></Link>
      <div className={style.item__container}>
        <Link to='/' className={style.clear}>1</Link>
        <ItemHeader />
        <ItemSlide />
        <ItemTextbox />
        <ItemGraph />
      </div>
    </>
  )
}

export default Item
