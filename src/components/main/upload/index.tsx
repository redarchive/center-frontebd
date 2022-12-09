import React, { FormEvent, useState } from 'react'
import toast from 'react-hot-toast'
import Creatable from 'react-select/creatable'
import { FileUploader } from 'react-drag-drop-files'
import * as style from './style.module.scss'

interface Props {
  onSubmit: (data: CreateServiceDto) => any
}

interface CreateClientDto {
  name: string
  redirectUris: string[]
  scopes: CreateScopeDto[]
}

interface CreateScopeDto {
  type: string
  reason: string
}

interface CreateServiceDto {
  name: string
  description: string
  clients: CreateClientDto[]
  logoUrl: string
  promotionImageUrl: string
  serviceUrl?: string
  sourceUrl?: string
  screenshots: string[]
  tags: string[]
  type: string
}

const Upload = ({ onSubmit }: Props): JSX.Element => {
  const [data, setData] = useState<Partial<CreateServiceDto>>({})

  const onSubmitFn = (e: FormEvent): void => {
    e.preventDefault()

    if (data.name === undefined || data.name.length < 10) {
      toast.error('서비스 명을 10자 이상 입력해주세요.')
      return
    }

    if (data.logoUrl === undefined) {
      toast.error('서비스 아이콘을 등록해주세요.')
      return
    }

    onSubmit(data as CreateServiceDto)
  }

  const onLogoSelected = async (file: File): Promise<void> => {
    const logoUrls = await toast.promise(uploadImage([file], 'SERVICE_LOGO'), {
      error: '로고 이미지 업로드 중 오류 발생!',
      loading: '로고 이미지 업로드 중...',
      success: '로고 이미지 업로드 완료!'
    })

    setData((data) => ({
      ...data,
      logoUrl: logoUrls[0]
    }))
  }

  const onPromotionSelected = async (file: File): Promise<void> => {
    const promotionUrls = await toast.promise(uploadImage([file], 'SERVICE_PROMOTION_IMAGE'), {
      error: '홍보 이미지 업로드 중 오류 발생!',
      loading: '홍보 이미지 업로드 중...',
      success: '홍보 이미지 업로드 완료!'
    })

    setData((data) => ({
      ...data,
      promotionImageUrl: promotionUrls[0]
    }))
  }

  const onScreenshotSelected = async (files: File[]): Promise<void> => {
    const screenshotUrls = await toast.promise(uploadImage(files, 'SERVICE_SCREENSHOT'), {
      error: '스크린샷 업로드 중 오류 발생!',
      loading: `${files.length}개의 스크린샷 업로드 중...`,
      success: `${files.length}개의 스크린샷 업로드 완료!`
    })

    setData((data) => ({
      ...data,
      screenshots: [
        ...data.screenshots ?? [],
        ...screenshotUrls
      ]
    }))
  }

  const onScreenshotDelete = (id: number) => () => {
    setData((data) => ({
      ...data,
      screenshots: [
        ...data.screenshots?.filter((_, i) => i !== id) ?? []
      ]
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
          name: file.name,
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
      <a href='#' className={style.item__back}></a>
      <div className={style.item__container}>
        <form action="/" onSubmit={onSubmitFn}>
          <div className={style.input__box}>
            <label htmlFor="name">서비스 명 *</label>
            <input id="name" onChange={(e) => setData({ ...data, name: e.target.value })} type="text" placeholder='서비스 명을 입력하세요.' />
            <p>예시: 3C인증제 - 인증제를 쉽고 편리하게</p>
          </div>
          <div className={style.input__box}>
            <label>서비스 아이콘 *</label>
            <FileUploader hoverTitle="이곳에 놓아서 업로드" types={['JPG', 'PNG', 'WEBP', 'GIF', 'APNG']} handleChange={onLogoSelected}>
              <div className={style.icon__box}>
                {data.logoUrl !== undefined && <img src={data.logoUrl}></img>}
                {data.logoUrl === undefined && (
                  <div>
                    <p>대표 아이콘 선택</p>
                    <p>이미지 끌어다 놓거나 <label htmlFor="icon">찾아보기</label></p>
                  </div>
                )}
              </div>
            </FileUploader>
            <p>정사각형 비율. 1024x1024 픽셀 추천</p>
          </div>
          <div className={style.input__box}>
            <label>서비스 홍보 이미지 *</label>
            <FileUploader hoverTitle="이곳에 놓아서 업로드" types={['JPG', 'PNG', 'WEBP', 'GIF', 'APNG']} handleChange={onPromotionSelected}>
              <div className={style.file__box}>
                {data.logoUrl !== undefined && <img src={data.promotionImageUrl}></img>}
                {data.logoUrl === undefined && (
                  <div>
                    <p>홍보 이미지 선택(하나만)</p>
                    <p>이미지 끌어다 놓거나 <label htmlFor="banner">찾아보기</label></p>
                  </div>
                )}
              </div>
            </FileUploader>
            <p>16:9 비율. 1920x1080 픽셀 추천</p>
          </div>
          <div className={style.input__box}>
            <label>서비스 스크린샷 이미지 (최소 4개) *</label>
            <div>
              <div className={style.screenshot__box_top}>
                {data.screenshots?.map((v, i) =>
                  <>
                    <img key={i} src={v}></img>
                    <button type="button" key={`${i}-del`} onClick={onScreenshotDelete(i)}></button>
                  </>)}
                {(data.screenshots?.length ?? 0) < 1 && (
                  <div>
                    <p>등록된 스크린샷이 없습니다</p>
                    <p>아래 등록 버튼을 통해 업로드 하실 수 있습니다.</p>
                  </div>
                )}
              </div>
              <div className={style.screenshot__box_bottom}>
                <FileUploader multiple hoverTitle="이곳에 놓아서 업로드" types={['JPG', 'PNG', 'WEBP', 'GIF', 'APNG']} handleChange={onScreenshotSelected}>
                  <div>
                    <p>+ 이미지 끌어다 놓거나 <label htmlFor="banner">찾아보기</label></p>
                  </div>
                </FileUploader>
              </div>
            </div>
            <p>JPG, PNG, WEBP, GIF 지원. 비율 자유.</p>
          </div>
          <div className={style.input__box}>
            <label>서비스 설명 (500자 이하) *</label>
            <div className={style.edit}>
              <textarea onChange={(e) => setData({ ...data, description: e.target.value })} placeholder='500자 이하의 간단한 설명을 입력해주세요.'></textarea>
            </div>
            <p>마크다운 문법 지원</p>
          </div>
          <div className={style.input__box}>
            <label>서비스 태그 *</label>
            <Creatable isMulti classNamePrefix="selector" />
            <input type="text" placeholder='태그를 선택해주세요.' />
          </div>
          <div className={style.input__box}>
            <label>서비스 카테고리 *</label>
            <input type="text" placeholder='카테고리를 선택해주세요.' />
          </div>
          <div className={style.input__box}>
            <label>서비스 URL *</label>
            <input type="text" placeholder='URL을 입력해주세요.' />
          </div>
          <div className={style.input__box}>
            <label>서비스 소스코드 주소 (Github)</label>
            <input type="text" placeholder='소스코드 주소를 입력해주세요.' />
          </div>
          <input type="checkbox" id='check' />
          <div className={style.check__box}>
            <label htmlFor="check" className={style.checkbox}></label>
            <label htmlFor="check" className={style.label}>통합로그인 시스템 사용여부</label>
          </div>
          <div className={style.whether}>
            <div className={style.input__box}>
              <input type="text" placeholder='클라이언트 #1 이름' />
            </div>
            <div className={style.input__box}>
              <input type="text" placeholder='리다이렉트 URL #1 주소' />
            </div>
            <div className={style.input__box}>
              <input type="text" placeholder='리다이렉트 URL #2 주소' />
            </div>
            <div className={style.plus__btn}>
              리다이렉트 URL추가
            </div>
            <div className={style.check__box}>
              <label htmlFor="check" className={style.checkbox}></label>
              <label htmlFor="check" className={style.label}>실명 데이터</label>
            </div>
            <div className={style.edit}>
              <textarea placeholder='실명 데이터를 쓰는 이유 작성'></textarea>
            </div>
            <div className={style.check__box}>
              <label htmlFor="check" className={style.checkbox}></label>
              <label htmlFor="check" className={style.label}>이메일 데이터</label>
            </div>
            <div className={style.edit}>
              <textarea placeholder='이메일 데이터를 쓰는 이유 작성'></textarea>
            </div>
          </div>
          <div className={style.btn}>
            <button type='submit' className={style.upload__btn}>등록하기</button>
          </div>
        </form>
        <a href="#" className={style.clear}>1</a>
      </div>
    </>
  )
}

export default Upload
