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

const Popularity = ({ data }: any): JSX.Element => {
  return (
    <div className={style.popularity}>
        <div className={style.title}>TOP10</div>
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
        className="popularity"
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
        {data?.top10.map((v: any, i: number) => (
          <SwiperSlide key={i}>
            <div className={style.card}>
              <Link to={`/#${v.id as string}`} className={style.main}>
                <div className={style.pc}><img src={v.promotionImageUrl} width={300} /></div>
                <div className={style.title}>
                  <div>{v.name}</div>
                </div>
              </Link>
              <div className={style.sub}>
                <div className={style.profile}>
                  <div className={style.profile__img} style={{ backgroundImage: v.user.profileImage ? `url(${v.user.profileImage as string})` : 'unset' }}>
                    {!v.user.profileImage && (v.user.nickname ?? v.user.person.name)[0]}
                  </div>
                  <div className={style.profile__name}>{v.user.nickname ?? v.user.person.name}</div>
                </div>
                <div className={style.day}>{moment(v.createdAt).format('YYYY.MM.DD')}</div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}

export default Popularity
