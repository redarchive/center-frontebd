import React from 'react'
import { FaUpload } from 'react-icons/fa'
import * as style from './style.module.scss'

interface Props {
  onUpload: (data: string) => any
  isLoading: boolean
}

const AdminUpload = ({ onUpload, isLoading }: Props): JSX.Element => {
  const onSubmit = async (selectedFile?: File): Promise<void> => {
    if (selectedFile === undefined) {
      return
    }

    const data = await selectedFile.text()

    onUpload(data)
  }

  return (
    <div className={style.upload}>
      <form>
        <input
          onChange={(e) => { void onSubmit(e.target.files?.[0]) }}
          disabled={isLoading}
          accept="text/csv"
          type="file" id="file" />

        <label
          className={isLoading && style.loading}
          htmlFor="file">
          <FaUpload size={25} />
          <p>유저 데이터 업로드</p>
        </label>
      </form>
    </div>
  )
}

export default AdminUpload
