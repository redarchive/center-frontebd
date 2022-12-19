import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import Creatable from 'react-select/creatable'
import { FileUploader } from 'react-drag-drop-files'
import * as style from './style.module.scss'
import Select, { MultiValue, SingleValue } from 'react-select'

interface Props {
  onSubmit: (data: CreateServiceDto) => any
  loading: boolean
  editData?: Partial<CreateServiceDto>
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
  clients: Array<Partial<CreateClientDto>>
  logoUrl: string
  promotionImageUrl: string
  serviceUrl?: string
  sourceUrl?: string
  screenshots: string[]
  tags: string[]
  type: string
}

const Upload = ({ onSubmit, loading, editData = {} }: Props): JSX.Element => {
  const [data, setData] = useState<Partial<CreateServiceDto>>(editData ?? {})
  const [tags, setTags] = useState<Array<{ label: string, value: string }>>([])
  const [useLogin, setUseLogin] = useState(!!editData.clients ?? false)

  const categoryOptions = [
    { value: 'WEBSITE', label: '웹사이트' },
    { value: 'MOBILE', label: '어플' },
    { value: 'GAME', label: '게임' },
    { value: 'DESKTOP', label: '데스크톱' },
    { value: 'PHYSICAL', label: 'IOT' }
  ]

  const onSubmitFn = (e: FormEvent): void => {
    if (loading) return
    e.preventDefault()

    if (data.name === undefined || data.name.length < 10) {
      toast.error('서비스 명을 10자 이상 입력해주세요.')
      return
    }

    if (data.logoUrl === undefined) {
      toast.error('서비스 아이콘을 등록해주세요.')
      return
    }

    if (data.promotionImageUrl === undefined) {
      toast.error('서비스 홍보 이미지를 등록해주세요.')
      return
    }

    if (data.screenshots === undefined || data.screenshots.length < 4) {
      toast.error('스크린샷 이미지를 최소 4개 등록해주세요.')
      return
    }

    if (data.description === undefined || data.description.length < 30) {
      toast.error('서비스 설명을 30자 이상 입력해주세요.')
      return
    }

    if (data.tags === undefined || data.tags.length < 1) {
      toast.error('서비스 태그를 하나 이상 입력해주세요.')
      return
    }

    if (data.type === undefined) {
      toast.error('서비스 카테고리를 선택해주세요.')
      return
    }

    if (data.serviceUrl === undefined || data.serviceUrl.length === 0) {
      toast.error('서비스 URL을 입력해주세요.')
      return
    }

    if (!useLogin) {
      data.clients = []
      onSubmit(data as CreateServiceDto)
      return
    }

    for (const [clientIndex, client] of (data.clients ?? []).entries()) {
      if (client.name === undefined || client.name.length < 2) {
        toast.error(`클라이언트 #${clientIndex + 1} 이름을 2자 이상 입력해주세요`)
        return
      }

      for (const scope of client.scopes ?? []) {
        if (scope.reason === undefined || scope.reason.length < 10) {
          toast.error(`클라이언트 #${clientIndex + 1}의 ${scope.type} 정보 사용 사유란을 10자 이상 입력해주세요`)
        }
      }
    }

    onSubmit(data as CreateServiceDto)
  }

  const onLogoSelected = async (file: File): Promise<void> => {
    if (loading) return
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
    if (loading) return
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
    if (loading) return
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

  const onClientAdd = (): void => {
    if (loading) return
    setData((data) => ({
      ...data,
      clients: [
        ...data.clients ?? [],
        {
          redirectUris: [''],
          scopes: []
        }
      ]
    }))
  }

  const onScreenshotDelete = (id: number) => () => {
    if (loading) return
    setData((data) => ({
      ...data,
      screenshots: [
        ...data.screenshots?.filter((_, i) => i !== id) ?? []
      ]
    }))
  }

  const onClientDelete = (id: number) => () => {
    if (loading) return
    setData((data) => ({
      ...data,
      clients: [
        ...data.clients?.filter((_, i) => i !== id) ?? []
      ]
    }))
  }

  const onTagChange = (tags: MultiValue<{ value: string, label: string }>): void => {
    if (loading) return
    for (const value of tags) {
      if (value.label.length > 10) {
        toast.error('태그는 최대 10자리까지 가능합니다.')
        return
      }
    }

    setData((data) => ({
      ...data,
      tags: tags.map((v) => v.label)
    }))
  }

  const onCategoryChange = (tag: SingleValue<{ value: string }>): void => {
    if (loading) return
    setData((data) => ({
      ...data,
      type: tag?.value
    }))
  }

  const onLoginChange = (): void => {
    if (loading) return
    if (!useLogin && (data.clients === undefined || data.clients.length < 1)) {
      setData((data) => ({
        ...data,
        clients: [{
          redirectUris: [''],
          scopes: []
        }]
      }))
    }

    setUseLogin(!useLogin)
  }

  const onClientNameChange = (id: number) => (e: ChangeEvent<HTMLInputElement>) => {
    if (loading) return
    if (data.clients?.[id]) {
      data.clients[id].name = e.target.value
      setData({ ...data })
    }
  }

  const onRedirectUriAdd = (id: number) => () => {
    if (loading) return
    if (data.clients?.[id]) {
      data.clients[id].redirectUris?.push('')
      setData({ ...data })
    }
  }

  const onRedirectUriChange = (clientId: number, uriId: number) => (e: ChangeEvent<HTMLInputElement>) => {
    if (loading) return
    if (data.clients?.[clientId]?.redirectUris) {
      (data.clients[clientId].redirectUris ?? [])[uriId] = e.target.value
      setData({ ...data })
    }
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

  const fetchTags = async (): Promise<void> => {
    const tagsRes = await fetch('/api/services/@tags').then(async (res) => await res.json())
    if (!tagsRes.success) {
      toast.error('태그 목록을 가져오는데 실패하였습니다')
      return
    }

    setTags(tagsRes.data.tags.map((v: string) => ({ label: v, value: v })))
  }

  useEffect(() => {
    void fetchTags()
  }, [])

  const scopeForm = (clientId: number): JSX.Element => {
    const scopes = ['REAL_NAME', 'EMAIL', 'PHONE_NUMBER', 'GENDER', 'CLASS_INFO', 'DORMITORY']
    const forms = []

    for (const scope of scopes) {
      const scopeObjIndex = data.clients?.[clientId]?.scopes?.findIndex?.((v) => v.type === scope) ?? -1
      const scopeObj = data.clients?.[clientId].scopes?.[scopeObjIndex]

      const onUseChange = (): void => {
        if (loading) return
        if (!scopeObj) {
          data.clients?.[clientId].scopes?.push({
            type: scope,
            reason: ''
          })
          setData({ ...data })
          return
        }

        data.clients?.[clientId].scopes?.splice(scopeObjIndex, 1)
        setData({ ...data })
      }

      const onReasonChange = (e: ChangeEvent<HTMLTextAreaElement>): void => {
        if (loading) return
        (data.clients?.[clientId].scopes?.[scopeObjIndex] ?? { reason: '' }).reason = e.target.value
        setData({ ...data })
      }

      forms.push((
        <div className={style.edit}>
          <div className={style.check__box}>
            <input disabled={loading} onChange={onUseChange} checked={!!scopeObj} type="checkbox" id={`use-${clientId}-${scope}`} />
            <label htmlFor={`use-${clientId}-${scope}`}>{scope}</label>
          </div>

          {!!scopeObj && (
            <textarea disabled={loading} maxLength={100} onChange={onReasonChange} placeholder={`${scope} 데이터를 쓰는 이유 작성`}>{scopeObj?.reason}</textarea>
          )}
        </div>
      ))
    }

    return <>{forms}</>
  }

  return (
    <>
      <a href='#closed' className={style.item__back}></a>
      <div className={style.item__container}>
        <form onSubmit={onSubmitFn}>
          <div className={style.input__box}>
            <label htmlFor="name">서비스 명 *</label>
            <input disabled={loading} maxLength={30} value={data.name} id="name" onChange={(e) => setData({ ...data, name: e.target.value })} type="text" placeholder='서비스 명을 입력하세요.' />
            <p>예시: 3C인증제 - 인증제를 쉽고 편리하게</p>
          </div>
          <div className={style.input__box}>
            <label>서비스 아이콘 *</label>
            <FileUploader disabled={loading} hoverTitle="이곳에 놓아서 업로드" types={['JPG', 'PNG', 'WEBP', 'GIF', 'APNG']} handleChange={onLogoSelected}>
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
            <FileUploader disabled={loading} hoverTitle="이곳에 놓아서 업로드" types={['JPG', 'PNG', 'WEBP', 'GIF', 'APNG']} handleChange={onPromotionSelected}>
              <div className={style.file__box}>
                {data.promotionImageUrl !== undefined && <img src={data.promotionImageUrl}></img>}
                {data.promotionImageUrl === undefined && (
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
                <FileUploader disabled={loading} multiple hoverTitle="이곳에 놓아서 업로드" types={['JPG', 'PNG', 'WEBP', 'GIF', 'APNG']} handleChange={onScreenshotSelected}>
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
              <textarea disabled={loading} maxLength={500} onChange={(e) => setData({ ...data, description: e.target.value })} placeholder='500자 이하의 간단한 설명을 입력해주세요.' value={data.description}></textarea>
            </div>
            <p>마크다운 문법 지원</p>
          </div>
          <div className={style.input__box}>
            <label>서비스 태그 *</label>
            <Creatable value={data.tags?.map((v) => ({ label: v, value: v }))} isDisabled={loading} onChange={onTagChange} options={tags} isMulti classNamePrefix="selector" placeholder="태그를 선택해주세요" />
            <p>입력 후 엔터로 새 태그 생성</p>
          </div>
          <div className={style.input__box}>
            <label>서비스 카테고리 *</label>
            <Select value={categoryOptions[data.type as any]} isDisabled={loading} onChange={onCategoryChange} options={categoryOptions} isSearchable={false} classNamePrefix="selector"/>
          </div>
          <div className={style.input__box}>
            <label>서비스 URL *</label>
            <input disabled={loading} maxLength={100} value={data.serviceUrl} onChange={(e) => setData({ ...data, serviceUrl: e.target.value })} type="url" placeholder='URL을 입력해주세요.' />
          </div>
          <div className={style.input__box}>
            <label>서비스 소스코드 주소 (Github)</label>
            <input disabled={loading} maxLength={100} value={data.sourceUrl} onChange={(e) => setData({ ...data, sourceUrl: e.target.value || undefined })} type="url" placeholder='소스코드 주소를 입력해주세요.' />
          </div>
          <input type="checkbox" id='check' />
          <div className={style.check__box}>
            <input disabled={loading} checked={useLogin} onChange={onLoginChange} type="checkbox" id="useLogin" />
            <label htmlFor="useLogin">통합로그인 기능을 사용할래요</label>
          </div>
          {useLogin && data.clients?.map((v, i) =>
            <div className={style.whether} key={i}>
              {(i !== 0) && (
                <button disabled={loading} onClick={onClientDelete(i)} type='button' className={style.deleteme}>클라이언트 {i + 1} 삭제</button>
              )}

              <div className={style.input__box}>
                <label>클라이언트 #{i + 1} 이름</label>
                <input disabled={loading} maxLength={30} value={v.name} onChange={onClientNameChange(i)} type="text" placeholder={`클라이언트 #${i + 1} 이름`} />
                <p>로그인 화면 상단 &quot;OOO로 로그인 합니다&quot;로 표시됩니다.<br />(예시: 3C인증제 - 웹사이트, 3C인증제 - 안드로이드 앱)</p>
              </div>

              <div className={style.input__box}>
                <label>클라이언트 #{i + 1} 리다이렉트 주소</label>
                {v.redirectUris?.map((v, i2) => (
                  <input disabled={loading} maxLength={100} key={i2} value={v} type="text" placeholder={`리다이렉트 URL 주소 #${i2 + 1}`} onChange={onRedirectUriChange(i, i2)} />
                ))}
                <div onClick={onRedirectUriAdd(i)} className={style.plus2__btn}>
                  리다이렉트 URL추가
                </div>
                <p>로그인 후 사용자 정보가 전달될 위치입니다. (예시: http://localhost:3000/callback)</p>
              </div>

              <div className={style.scope__box}>
                <p>전송될 사용자 정보 선택</p>

                {scopeForm(i)}
              </div>
            </div>
          )}
          {useLogin && (
            <div onClick={onClientAdd} className={style.plus__btn}>
              클라이언트 추가
            </div>
          )}
          {editData.clients !== undefined && (
            <div className={style.notice}>
              주의: 편집시 클라이언트 ID가 재설정 됩니다!
            </div>
          )}
          <div className={style.btn}>
            <button disabled={loading} type='submit' className={style.upload__btn}>
              {loading ? '등록중...' : '등록하기'}
            </button>
          </div>
        </form>
        <a href="#" className={style.clear}>1</a>
      </div>
    </>
  )
}

export default Upload
