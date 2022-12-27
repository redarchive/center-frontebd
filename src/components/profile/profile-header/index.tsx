import React from 'react'
import * as style from './style.module.scss'

interface Props {
  user: any
  isMe: boolean
}

const Header = ({ user, isMe }: Props): JSX.Element => {
  if (!user) {
    return (
      <div className={style.header}>
        <div className={style.left}>
          <div className={style.iamge}></div>
          <div className={style.txt}>
            <div className={style.name}>...</div>
            <div className={style.sub}>...</div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className={style.header}>
      <div className={style.left}>
        <div className={style.iamge} style={{ backgroundImage: user.profileImage ? `url(${user.profileImage as string})` : 'unset' }}>
        {!user.profileImage && (user.nickname ?? user.person.name)[0]}
        </div>
        <div className={style.txt}>
          <div className={style.name}>{user.nickname || user.login}</div>
          {user.person && <div className={style.sub}>
            {user.person.grade ? String(user.person.grade) + '학년' : ''}
            {user.person.grade ? String(user.person.classroom) + '반' : ''}

            {user.person.name}
          </div>}
        </div>
      </div>
      {isMe && (
        <div className={style.right}>
          <a href="#editprof" className={style.btn}>프로필 수정</a>
        </div>
      )}
    </div>
  )
}

export default Header
