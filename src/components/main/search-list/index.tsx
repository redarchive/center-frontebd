import React from 'react'
import moment from 'moment'

import './style.scss'
import * as style from './style.module.scss'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'

const SearchList = ({ data, onNext, disabled, query }: any): JSX.Element => {
  return (
    <div className={style.searchlist}>
        <div className={style.title}>&quot;{query}&quot; 검색결과</div>
        <div className={style.card__box}>
          {(data?.result?.length ?? 0) > 0
            ? data?.result?.map((v: any, i: number) => (
              <div className={style.card} key={i}>
                <a href={`#${v.id as string}`} className={style.main}>
                  <div className={style.pc}><img src={v.promotionImageUrl} width={300} /></div>
                  <div className={style.title}>
                    <div>{v.name}</div>
                  </div>
                </a>
                <div className={style.sub}>
                  <div className={style.profile}>
                    <div className={style.profile__img}>{v.profileImage ? <img src={v.profileImage} /> : (v.user.nickname ?? v.user.person.name)[0]}</div>
                    <div className={style.profile__name}>{v.user.nickname ?? v.user.person.name}</div>
                  </div>
                  <div className={style.day}>{moment(v.createdAt).format('YYYY.MM.DD')}</div>
                </div>
              </div>
            ))
            : <div>검색 결과가 없습니다.</div>}
        </div>
      {!disabled && (
        <div className={style.update__btn}>
          <button onClick={onNext}>더 알아보기</button>
        </div>
      )}
    </div>
  )
}

export default SearchList
