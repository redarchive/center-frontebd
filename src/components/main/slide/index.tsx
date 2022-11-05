import React from 'react'
import './style.scss'

import { Swiper, SwiperSlide } from 'swiper/react'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'

// import required modules
import { Autoplay, Pagination, Navigation } from 'swiper'
import * as style from './style.module.scss'

const Slide = (): JSX.Element => {
  return (
    <div className={style.slide}>
      <Swiper
        slidesPerView={1}
        loop={true}
        pagination={{
          clickable: true,
          dynamicBullets: true
        }}
        navigation={true}
        modules={[Pagination, Navigation, Autoplay]}
        className='slide'
        autoplay={{
          delay: 5000, disableOnInteraction: false, pauseOnMouseEnter: true
        }}
      >
        <SwiperSlide><div className={style.parts}>1</div></SwiperSlide>
        <SwiperSlide><div className={style.parts}>2</div></SwiperSlide>
        <SwiperSlide><div className={style.parts}>3</div></SwiperSlide>
        <SwiperSlide><div className={style.parts}>4</div></SwiperSlide>
        <SwiperSlide><div className={style.parts}>5</div></SwiperSlide>
      </Swiper>
    </div>
  )
}

export default Slide
