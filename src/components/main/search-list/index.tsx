import React from 'react'

import './style.scss'
import * as style from './style.module.scss'
import { Swiper, SwiperSlide } from 'swiper/react'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'

// import required modules
import { Navigation, History } from 'swiper'
import { Link } from 'gatsby'
import moment from 'moment'

const SearchList = ({ data, onNext, disabled, query }: any): JSX.Element => {
  return (
    <div className={style.searchlist}>
        <div className={style.title}>검색</div>
        <Swiper
        slidesPerView={1}
        spaceBetween={40}
        slidesPerGroup={1}
        loopFillGroupWithBlank={true}
        pagination={{
          clickable: true
        }}
        navigation={true}
        modules={[Navigation, History]}
        className="searchlist"
        breakpoints={{
          768: {
            slidesPerView: 2,
            slidesPerGroup: 2
          },
          1024: {
            slidesPerView: 3,
            slidesPerGroup: 3
          },
          1456: {
            slidesPerView: 4,
            slidesPerGroup: 4
          }
        }}
      >
        {data?.result?.map((v: any, i: number) => (
          <SwiperSlide key={i}>
            <div className={style.card}>
              <Link to={`#${v.id as string}?query=${query ?? ''}`} className={style.main}>
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
          </SwiperSlide>
        ))}
      </Swiper>
      {!disabled && (
        <div className={style.update__btn}>
          <button onClick={onNext}>더 알아보기</button>
        </div>
      )}
    </div>
  )
}

export default SearchList
