import React from 'react'
import { FaArrowDown } from 'react-icons/fa'
import * as style from './style.module.scss'

const AdminExplanation = (): JSX.Element => {
  return (
    <div className={style.explain}>
      <FaArrowDown size={50} />
      유저 데이터를 수정 후 덮어쓰세요.
    </div>
  )
}

export default AdminExplanation
