import React from 'react'
import { FaDownload } from 'react-icons/fa'
import * as style from './style.module.scss'

const AdminDownload = (): JSX.Element => {
  return (
    <div className={style.download}>
      <a href="/api/persons/data.csv" download target="_blank">
        <FaDownload size={25} />
        <p>유저 데이터 다운로드</p>
      </a>
    </div>
  )
}

export default AdminDownload
