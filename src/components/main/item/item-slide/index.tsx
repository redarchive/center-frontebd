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

const Slide = (): JSX.Element => {
  return (
    <div className={style.item__slide}>
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
        className="item__slide"
        breakpoints={{
          768: {
            slidesPerView: 2,
            slidesPerGroup: 2
          }
        }}
      >
        <SwiperSlide>
          <div className={style.card}>
            <div className={style.pc}>1</div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className={style.card}>
            <div className={style.pc}>2</div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className={style.card}>
            <div className={style.pc}>3</div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className={style.card}>
            <div className={style.mobile}>4</div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className={style.card}>
            <div className={style.mobile}>5</div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className={style.card}>
            <div className={style.mobile}>6</div>
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  )
}

export default Slide
