import React from 'react'
import { FaUpload } from 'react-icons/fa'
import * as style from './style.module.scss'

const AdminUpload = (): JSX.Element => {
  return (
    <div className={style.upload}>
      <form action="">
        <input accept="text/csv" type="file" id="file" />
        <label htmlFor="file">
          <FaUpload size={25} />
          <p>유저 데이터 업로드</p>
        </label>
      </form>
    </div>
  )
}

export default AdminUpload
