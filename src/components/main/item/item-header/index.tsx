import { Link } from 'gatsby'
import React from 'react'
import * as style from './style.module.scss'

const Header = ({ data, user }: any): JSX.Element => {
  return (
    <div className={style.header}>
      <div className={style.left}>
        <h1 className={style.title}>{data.name}</h1>
        {user.user && <div className={style.sub}>등록자: <Link to={`/profile?id=${user.user.id as number}`}>{user.user.nickname ?? user.user.login}</Link></div>}
      </div>
      <div className={style.right}>
        {user.me && <a className={style.link}>수정</a>}
        <a href={data.serviceUrl} className={style.link}>이동하기</a>
      </div>
    </div>
  )
}

export default Header
