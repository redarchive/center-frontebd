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

const Slide = ({ data }: any): JSX.Element => {
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
        {!data && <SwiperSlide><div className={style.parts}></div></SwiperSlide>}
        {data?.banners.map((v: any, i: number) => (
          <SwiperSlide key={i}>
            <a href={`#${v.id as number}`}>
              <div className={style.parts}>
                <img src={v.promotionImageUrl} />
              </div>
            </a>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}

export default Slide
