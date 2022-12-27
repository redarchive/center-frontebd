import React, { FormEvent, useState } from 'react'
import { FileUploader } from 'react-drag-drop-files'
import { toast } from 'react-hot-toast'
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
  const [changePW, setChangePW] = useState(false)
  const [newPWCheck, setNewPWCheck] = useState('')

  const onSubmitFn = (e: FormEvent): void => {
    e.preventDefault()
    if (loading) return

    if (data.nickname) {
      if (data.nickname.length > 30) {
        toast.error('닉네임은 30자 이상일 수 없습니다.')
        return
      }

      if (data.nickname.length < 1) {
        delete data.nickname
      }
    }

    if (data.email && data.email.length > 30) {
      toast.error('이메일 주소는 30자 이상일 수 없습니다')
      return
    }

    if (!changePW) {
      delete data.oldPassword
      delete data.newPassword
    }

    if (changePW) {
      if (!data.oldPassword || data.oldPassword.length < 8 || data.oldPassword.length > 30) {
        toast.error('기존 비밀번호가 잘못 입력되었습니다.')
        return
      }

      if (!data.newPassword || data.newPassword.length < 8 || data.newPassword.length > 30) {
        toast.error('비밀번호는 8자 이상 30자 이하여야 합니다.')
        return
      }
    }

    onSubmit(data)
  }

  const onProfileSelected = async (file: File): Promise<void> => {
    if (loading) return
    const profileUrls = await toast.promise(uploadImage([file], 'USER_PROFILE_IMAGE'), {
      error: '프로필 이미지 업로드 중 오류 발생!',
      loading: '프로필 이미지 업로드 중...',
      success: '프로필 이미지 업로드 완료!'
    })

    setData((data) => ({
      ...data,
      profileImage: profileUrls[0]
    }))
  }

  const uploadImage = async (files: File[], type: string): Promise<string[]> => {
    const urls = []
    for (const file of files) {
      const presignedRes = await fetch('/api/files', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: encodeURIComponent(file.name),
          type
        })
      }).then(async (res) => await res.json())

      await fetch(presignedRes.data.url, {
        method: 'PUT',
        headers: {
          'Content-Type': file.type
        },
        body: file
      })

      urls.push(presignedRes.data.url.split('?')[0])
    }

    return urls
  }

  return (
    <>
      <a href='#closed' className={style.item__back}></a>
      <div className={style.item__container}>
        <form onSubmit={onSubmitFn}>
          <h1 className={style.title}>프로필 수정</h1>

          <div className={style.input__box}>
            <label htmlFor="nickname">닉네임</label>
            <input value={data.nickname} onChange={(e) => setData({ ...data, nickname: e.target.value })} disabled={loading} maxLength={30} id="nickname" type="text" placeholder='닉네임을 입력하세요.' />
          </div>
          <div className={style.input__box}>
            <label htmlFor="email">이메일</label>
            <input value={data.email} onChange={(e) => setData({ ...data, email: e.target.value })} disabled={loading} maxLength={30} id="email" type="email" placeholder='이메일을 입력하세요.' />
          </div>
          <div className={style.input__box}>
            <label>프로필 이미지</label>
            <FileUploader disabled={loading} hoverTitle="이곳에 놓아서 업로드" types={['JPG', 'PNG', 'WEBP', 'GIF', 'APNG']} handleChange={onProfileSelected}>
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
          <div className={style.check__box}>
            <input disabled={loading} checked={changePW} onChange={() => setChangePW(!changePW)} type="checkbox" id="changePW" />
            <label htmlFor="changePW">비밀번호를 변경할래요</label>
          </div>
          {changePW && (
            <>
              <div className={style.input__box}>
                <label htmlFor="oldpasswd">이전 비밀번호 *</label>
                <input value={data.oldPassword} onChange={(e) => setData({ ...data, oldPassword: e.target.value })} disabled={loading} maxLength={30} id="oldpasswd" type="password" placeholder='이전 비밀번호을 입력하세요.' />
              </div>
              <div className={style.input__box}>
                <label htmlFor="newpasswd">새 비밀번호 *</label>
                <input value={data.newPassword} onChange={(e) => setData({ ...data, newPassword: e.target.value })} disabled={loading} maxLength={30} id="newpasswd" type="password" placeholder='새 비밀번호를 입력하세요.' />
              </div>
              <div className={style.input__box}>
                <label htmlFor="newpasswd-chk">새 비밀번호 확인 *</label>
                <input value={newPWCheck} onChange={(e) => setNewPWCheck(e.target.value)} disabled={loading} maxLength={30} id="newpasswd-chk" type="password" placeholder='확인을 위해 새 비밀번호를 한번더 입력하세요.' />
              </div>
            </>
          )}
          <div className={style.btn}>
            <button disabled={loading} type='submit' className={style.upload__btn}>
              {loading ? '수정중...' : '수정하기'}
            </button>
          </div>
        </form>
        <a href="#" className={style.clear}><FaPlus/></a>
      </div>
    </>
  )
}

export default EditProf
