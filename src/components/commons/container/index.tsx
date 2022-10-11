import React, { ReactNode } from 'react'
import * as style from './style.module.scss'

interface Props {
  /**
   * #### 컨테이너 크기
   *
   * * `sm`: 작은 컨테이너 ex) 로그인페이지
   * * `lg`: 큰 컨테이너 ex) 메인페이지
   */
  size?: 'sm' | 'lg'
  className?: string
  children: ReactNode
}

/**
 * 페딩, 마진 주고 중앙정렬함
 */
const Container = ({ className, size = 'lg', children }: Props): JSX.Element => {
  return (
    <div className={style.outer}>
      <div className={style[size + 'Inner']}>
        <div className={className}>
          {children}
        </div>
      </div>
    </div>
  )
}

export default Container
