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
        <a href={data.serviceUrl} className={style.link}>이동하기</a>
        {user.me && <Link to={`/profile?id=${user.user.id as number}#edit-${data.id as number}`} className={style.link}>수정</Link>}
        {user.me && <Link to={`/profile?id=${user.user.id as number}#delete-${data.id as number}`} className={style.deletes}>삭제</Link>}
      </div>
    </div>
  )
}

export default Header
