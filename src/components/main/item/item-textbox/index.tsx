import React from 'react'
import * as style from './style.module.scss'

const ItemTextbox = (): JSX.Element => {
  return (
    <div className={style.item__textbox}>
      <div className={style.title}>설명</div>
      <div className={style.text__content}>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam sed veniam
        mollitia voluptas a vel. Ea fugit, consequatur voluptatum magnam, molestias,
        adipisci ex sequi esse repellendus illo similique debitis est! Soluta maxime
        deserunt illo suscipit ratione, rem delectus pariatur officiis laudantium
        cupiditate iste nesciunt accusantium explicabo possimus nobis modi
        doloribus? Obcaecati, odit ipsum? Repellat error veritatis ut quam minima
        molestiae.
      </div>
      <div className={style.day}>
        <div>업로드 날짜</div>
        <span>2022.01.10</span>
      </div>
    </div>
  )
}

export default ItemTextbox
