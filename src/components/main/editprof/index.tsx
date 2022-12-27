import React, { useState } from 'react'
import { FileUploader } from 'react-drag-drop-files'
import * as style from './style.module.scss'
import { FaPlus } from 'react-icons/fa'

interface Props {
  onSubmit: (data: UpdateUserDto) => any
  loading: boolean
  userData: UpdateUserDto
}

export interface UpdateUserDto {
  id: number
  phoneVerify?: string
  nickname?: string
  email?: string
  profileImage?: string
  oldPassword?: string
  newPassword?: string
}

const EditProf = ({ userData, onSubmit, loading }: Props): JSX.Element => {
  const [data, setData] = useState<UpdateUserDto>(userData)

  const onSubmitFn = (): void => {
    onSubmit(data)
  }

  return (
    <>
      <a href='#closed' className={style.item__back}></a>
      <div className={style.item__container}>
        <form onSubmit={onSubmitFn}>
          <h1 className={style.title}>프로필 수정</h1>

          <div className={style.input__box}>
            <label htmlFor="nickname">닉네임 *</label>
            <input onChange={(e) => setData({ ...data, nickname: e.target.value })} disabled={loading} maxLength={30} id="nickname" type="text" placeholder='닉네임을 입력하세요.' />
          </div>
          <div className={style.input__box}>
            <label htmlFor="email">이메일 *</label>
            <input disabled={loading} maxLength={30} id="email" type="email" placeholder='이메일을 입력하세요.' />
          </div>
          <div className={style.input__box}>
            <label>프로필 이미지 *</label>
            <FileUploader disabled={loading} hoverTitle="이곳에 놓아서 업로드" types={['JPG', 'PNG', 'WEBP', 'GIF', 'APNG']}>
              <div className={style.icon__box}>
                {data.profileImage && <img src={data.profileImage}></img>}
                {!data.profileImage && (
                  <div>
                    <p>프로필 이미지 선택</p>
                    <p>이미지 끌어다 놓거나 <label htmlFor="icon">찾아보기</label></p>
                  </div>
                )}
              </div>
            </FileUploader>
            <p>정사각형 비율. 1024x1024 픽셀 추천</p>
          </div>
        </form>
        <a href="#" className={style.clear}><FaPlus/></a>
      </div>
    </>
  )
}

export default EditProf
