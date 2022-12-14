import React from 'react'
import { FaUpload } from 'react-icons/fa'
import { FileUploader } from 'react-drag-drop-files'
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
        <FileUploader className={isLoading && style.loading} disabled={isLoading} hoverTitle="이곳에 놓아서 업로드" types={['CSV']} handleChange={onSubmit}>
          <FaUpload size={25} />
          <p>유저 데이터 업로드</p>
        </FileUploader>
      </form>
    </div>
  )
}

export default AdminUpload
