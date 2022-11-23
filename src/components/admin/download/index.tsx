import React from 'react'
import { FaDownload } from 'react-icons/fa'
import * as style from './style.module.scss'

interface Props {
  isLoading: boolean
}

const AdminDownload = ({ isLoading }: Props): JSX.Element => {
  return (
    <div className={style.download}>
      <a
        className={isLoading && style.loading}
        href={isLoading ? '#' : '/api/persons/data.csv'}
        download="경소고_회원관리.csv" target="_blank" rel="noreferrer">

        <FaDownload size={25} />
        <p>유저 데이터 다운로드</p>
      </a>
    </div>
  )
}

export default AdminDownload
