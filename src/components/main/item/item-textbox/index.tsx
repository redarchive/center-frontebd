import React from 'react'
import MarkdownView from 'react-showdown'
import xss from 'xss'
import * as style from './style.module.scss'
import moment from 'moment'

const Textbox = ({ data }: any): JSX.Element => {
  return (
    <div className={style.item__textbox}>
      <div className={style.title}>설명</div>
      <div className={style.text__content}>
        <MarkdownView markdown={xss(data.description)}/>
      </div>
      <div className={style.tags}>
        {data.tags.map((v: any, i: number) => (
          <span key={i}>#{v.label}</span>
        ))}
      </div>
      <div className={style.day}>
        <div>업로드 날짜</div>
        <span>{moment(data.createdAt).format('YYYY.MM.DD')}</span>
      </div>
    </div>
  )
}

export default Textbox
