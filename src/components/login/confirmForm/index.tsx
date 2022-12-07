import React, { FormEvent } from 'react'
import toast from 'react-hot-toast'
import { useSearchParam } from 'react-use'
import * as style from './style.module.scss'

interface Props {
  client: any
}

const ConfirmForm = ({ client }: Props): JSX.Element => {
  const redirectUri = useSearchParam('redirect_uri') ?? ''
  const nonce = useSearchParam('nonce') ?? ''
  const state = useSearchParam('state') ?? ''

  const labelScope = (scope: string): string => ({
    openid: '식별번호',
    real_name: '실명',
    email: '이메일',
    phone_number: '전화번호',
    gender: '성별',
    class_info: '학번',
    dormitory: '기숙사정보'
  })[scope] ?? '알수없음'

  const onSubmit = async (e: FormEvent): Promise<void> => {
    e.preventDefault()

    const result = await fetch('/api/tokens', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        clientId: client.id,
        scopes: client.scopes.map((v: any) => v.type),
        nonce
      })
    }).then(async (res) => await res.json())

    if (!result.success) {
      toast.error('토큰 생성중 문제 발생!')
      return
    }

    toast.loading('리다이렉트 중...')

    const url = new URL(redirectUri)
    url.searchParams.set('id_token', result.data.token)
    url.searchParams.set('state', state)

    window.location.assign(url)
  }

  const onLogout = (): void => {
    void fetch('/api/sessions/@this', {
      method: 'DELETE'
    }).then(() => {
      window.location.reload()
    })
  }

  return (
    <form className={style.form} onSubmit={(e) => { void onSubmit(e) }}>
      {client && (
        <>
          <p>아래의 정보들을 요청합니다.</p>
          <div className={style.scopes}>
            {client.scopes.map((v: any, i: number) => (
              <div className={style.scope} key={i}>
                <h2>{labelScope(v.type.toLowerCase())}</h2>
                <p>{v.type === 'OPENID' ? '사용자를 식별하기 위한 기본 제공 정보입니다.' : v.reason}</p>
              </div>
            ))}
          </div>

          <button>승인</button>
          <a href="#logout" onClick={onLogout}>다른 계정으로 계속...</a>
        </>
      )}
    </form>
  )
}

export default ConfirmForm
