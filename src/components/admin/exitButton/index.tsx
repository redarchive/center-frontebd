import React from 'react'
import { Link } from 'gatsby'
import { FaAngleLeft } from 'react-icons/fa'
import * as style from './style.module.scss'

const AdminExitButton = (): JSX.Element => {
  return (
    <Link to="/">
      <button className={style.exit}>
        <FaAngleLeft /> <span>돌아가기</span>
      </button>
    </Link>
  )
}

export default AdminExitButton
