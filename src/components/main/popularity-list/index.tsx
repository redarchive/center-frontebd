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
            <Link to='/#1' className={style.main}>
              <div className={style.pc}></div>
              <div className={style.title}>
                <div>Title Text</div>
              </div>
            </Link>
            <div className={style.sub}>
              <div className={style.profile}>
                <div className={style.profile__img}>김</div>
                <div className={style.profile__name}>김무일</div>
              </div>
              <div className={style.day}>2022.01.10</div>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className={style.card}>
            <Link to='/#2' className={style.main}>
              <div className={style.mobile}></div>
              <div className={style.title}>
                <div>Title Text</div>
              </div>
            </Link>
            <div className={style.sub}>
              <div className={style.profile}>
                <div className={style.profile__img}>박</div>
                <div className={style.profile__name}>박민혁</div>
              </div>
              <div className={style.day}>2022.01.10</div>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className={style.card}>
            <Link to='/#3' className={style.main}>
              <div className={style.pc}></div>
              <div className={style.title}>
                <div>Title Text</div>
              </div>
            </Link>
            <div className={style.sub}>
              <div className={style.profile}>
                <div className={style.profile__img}>윤</div>
                <div className={style.profile__name}>윤서준</div>
              </div>
              <div className={style.day}>2022.01.10</div>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className={style.card}>
            <Link to='/#4' className={style.main}>
              <div className={style.pc}></div>
              <div className={style.title}>
                <div>Title Text</div>
              </div>
            </Link>
            <div className={style.sub}>
              <div className={style.profile}>
                <div className={style.profile__img}>임</div>
                <div className={style.profile__name}>임준형</div>
              </div>
              <div className={style.day}>2022.01.10</div>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className={style.card}>
            <Link to='/#5' className={style.main}>
              <div className={style.pc}></div>
              <div className={style.title}>
                <div>Title Text</div>
              </div>
            </Link>
            <div className={style.sub}>
              <div className={style.profile}>
                <div className={style.profile__img}>김</div>
                <div className={style.profile__name}>김무일</div>
              </div>
              <div className={style.day}>2022.01.10</div>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className={style.card}>
            <Link to='/#6' className={style.main}>
              <div className={style.mobile}></div>
              <div className={style.title}>
                <div>Title Text</div>
              </div>
            </Link>
            <div className={style.sub}>
              <div className={style.profile}>
                <div className={style.profile__img}>박</div>
                <div className={style.profile__name}>박민혁</div>
              </div>
              <div className={style.day}>2022.01.10</div>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className={style.card}>
            <Link to='/#7' className={style.main}>
              <div className={style.pc}></div>
              <div className={style.title}>
                <div>Title Text</div>
              </div>
            </Link>
            <div className={style.sub}>
              <div className={style.profile}>
                <div className={style.profile__img}>윤</div>
                <div className={style.profile__name}>윤서준</div>
              </div>
              <div className={style.day}>2022.01.10</div>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className={style.card}>
            <Link to='/#8' className={style.main}>
              <div className={style.pc}></div>
              <div className={style.title}>
                <div>Title Text</div>
              </div>
            </Link>
            <div className={style.sub}>
              <div className={style.profile}>
                <div className={style.profile__img}>임</div>
                <div className={style.profile__name}>임준형</div>
              </div>
              <div className={style.day}>2022.01.10</div>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className={style.card}>
            <Link to='/#9' className={style.main}>
              <div className={style.pc}></div>
              <div className={style.title}>
                <div>Title Text</div>
              </div>
            </Link>
            <div className={style.sub}>
              <div className={style.profile}>
                <div className={style.profile__img}>김</div>
                <div className={style.profile__name}>김무일</div>
              </div>
              <div className={style.day}>2022.01.10</div>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className={style.card}>
            <Link to='/#10' className={style.main}>
              <div className={style.mobile}></div>
              <div className={style.title}>
                <div>Title Text</div>
              </div>
            </Link>
            <div className={style.sub}>
              <div className={style.profile}>
                <div className={style.profile__img}>박</div>
                <div className={style.profile__name}>박민혁</div>
              </div>
              <div className={style.day}>2022.01.10</div>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className={style.card}>
            <Link to='/#11' className={style.main}>
              <div className={style.pc}></div>
              <div className={style.title}>
                <div>Title Text</div>
              </div>
            </Link>
            <div className={style.sub}>
              <div className={style.profile}>
                <div className={style.profile__img}>윤</div>
                <div className={style.profile__name}>윤서준</div>
              </div>
              <div className={style.day}>2022.01.10</div>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className={style.card}>
            <Link to='/#12' className={style.main}>
              <div className={style.pc}></div>
              <div className={style.title}>
                <div>Title Text</div>
              </div>
            </Link>
            <div className={style.sub}>
              <div className={style.profile}>
                <div className={style.profile__img}>임</div>
                <div className={style.profile__name}>임준형</div>
              </div>
              <div className={style.day}>2022.01.10</div>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  )
}

export default Popularity
