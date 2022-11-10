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

const Popularity = (): JSX.Element => {
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
        <SwiperSlide>
          <div className={style.card}>
            <div className={style.top}>
              <Link to='/' className={style.first}></Link>
              <Link to='/' className={style.second}></Link>
              <Link to='/' className={style.profile}>앙</Link>
            </div>
            <div className={style.bottom}>
              <div className={style.name}>앙무일</div>
              <div className={style.job}>front-end</div>
              <button className={style.button}>알아보기</button>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className={style.card}>
            <div className={style.top}>
              <Link to='/' className={style.first}></Link>
              <Link to='/' className={style.second}></Link>
              <Link to='/' className={style.profile}>박</Link>
            </div>
            <div className={style.bottom}>
              <div className={style.name}>박민혁</div>
              <div className={style.job}>back-end</div>
              <button className={style.button}>알아보기</button>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className={style.card}>
            <div className={style.top}>
              <Link to='/' className={style.first}></Link>
              <Link to='/' className={style.second}></Link>
              <Link to='/' className={style.profile}>윤</Link>
            </div>
            <div className={style.bottom}>
              <div className={style.name}>윤서준</div>
              <div className={style.job}>back-end</div>
              <button className={style.button}>알아보기</button>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className={style.card}>
            <div className={style.top}>
              <Link to='/' className={style.first}></Link>
              <Link to='/' className={style.second}></Link>
              <Link to='/' className={style.profile}>김</Link>
            </div>
            <div className={style.bottom}>
              <div className={style.name}>짱무일</div>
              <div className={style.job}>front-end</div>
              <button className={style.button}>알아보기</button>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className={style.card}>
            <div className={style.top}>
              <Link to='/' className={style.first}></Link>
              <Link to='/' className={style.second}></Link>
              <Link to='/' className={style.profile}>김</Link>
            </div>
            <div className={style.bottom}>
              <div className={style.name}>김무일</div>
              <div className={style.job}>front-end</div>
              <button className={style.button}>알아보기</button>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className={style.card}>
            <div className={style.top}>
              <Link to='/' className={style.first}></Link>
              <Link to='/' className={style.second}></Link>
              <Link to='/' className={style.profile}>박</Link>
            </div>
            <div className={style.bottom}>
              <div className={style.name}>박민혁</div>
              <div className={style.job}>back-end</div>
              <button className={style.button}>알아보기</button>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className={style.card}>
            <div className={style.top}>
              <Link to='/' className={style.first}></Link>
              <Link to='/' className={style.second}></Link>
              <Link to='/' className={style.profile}>윤</Link>
            </div>
            <div className={style.bottom}>
              <div className={style.name}>윤서준</div>
              <div className={style.job}>back-end</div>
              <button className={style.button}>알아보기</button>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className={style.card}>
            <div className={style.top}>
              <Link to='/' className={style.first}></Link>
              <Link to='/' className={style.second}></Link>
              <Link to='/' className={style.profile}>김</Link>
            </div>
            <div className={style.bottom}>
              <div className={style.name}>짱무일</div>
              <div className={style.job}>front-end</div>
              <button className={style.button}>알아보기</button>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className={style.card}>
            <div className={style.top}>
              <Link to='/' className={style.first}></Link>
              <Link to='/' className={style.second}></Link>
              <Link to='/' className={style.profile}>김</Link>
            </div>
            <div className={style.bottom}>
              <div className={style.name}>김무일</div>
              <div className={style.job}>front-end</div>
              <button className={style.button}>알아보기</button>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className={style.card}>
            <div className={style.top}>
              <Link to='/' className={style.first}></Link>
              <Link to='/' className={style.second}></Link>
              <Link to='/' className={style.profile}>박</Link>
            </div>
            <div className={style.bottom}>
              <div className={style.name}>박민혁</div>
              <div className={style.job}>back-end</div>
              <button className={style.button}>알아보기</button>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  )
}

export default Popularity
