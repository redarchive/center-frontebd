import React, { FormEvent, useState } from 'react'
import { HashLoader } from 'react-spinners'
import * as style from './style.module.scss'

export interface ForgotPWFormData {
  id: string
  phone: string
  code: string
  password: string
  passwordCheck: string
}

interface Props {
  onSubmit: (data: ForgotPWFormData) => any
  disabled: boolean
  step?: number
}

const ForgotPWForm = ({ onSubmit, disabled, step = 0 }: Props): JSX.Element => {
  const [id, setId] = useState('')
  const [phone, setPhone] = useState('')
  const [code, setCode] = useState('')
  const [password, setPassword] = useState('')
  const [passwordCheck, setPasswordCheck] = useState('')

  const onFormSubmit = (e: FormEvent): void => {
    e.preventDefault()
    if (disabled) return

    onSubmit({
      id,
      phone,
      code,
      password,
      passwordCheck
    })
  }

  return (
    <form onSubmit={onFormSubmit} className={style.forgotPWForm}>
      {step < 2 && (
        <>
          <div>
            <label htmlFor="forgotPWForm-login">아이디</label>
            <input
              disabled={disabled || step > 0}
              value={id} onChange={(e) => setId(e.target.value)}
              autoFocus id="forgotPWForm-login"
              type="text" placeholder="아이디를 입력해주세요." />
          </div>

          <div>
            <label htmlFor="forgotPWForm-phone">전화번호</label>
            <input
              disabled={disabled || step > 0}
              value={phone} onChange={(e) => setPhone(e.target.value)}
              id="forgotPWForm-phone" type="text"
              placeholder="전화번호를 입력해주세요 ( - 제외 )"/>
          </div>

          <button disabled={disabled || step > 0} type="submit">
            {!(disabled || step > 0) && '인증번호 전송'}
            {(disabled || step > 0) && (
              <>
                <HashLoader size={20} />
                전화번호 인증 중...
              </>
            )}
          </button>
        </>
      )}

      {step === 1 && (
        <>
          <div>
            <label htmlFor="forgotPWForm-code">인증코드</label>
            <input
              disabled={disabled}
              value={code} onChange={(e) => setCode(e.target.value)}
              id="forgotPWForm-code" type="text"
              placeholder="인증코드를 입력해주세요"/>
          </div>

          <button disabled={disabled} type="submit">
            {!disabled && '인증'}
            {disabled && (
              <>
                <HashLoader size={20} />
                인증 중...
              </>
            )}
          </button>
        </>
      )}

      {step === 2 && (
        <>
          <div>
            <label htmlFor="forgotPWForm-pw">새 비밀번호</label>
            <input
              disabled={disabled}
              value={password} onChange={(e) => setPassword(e.target.value)}
              id="forgotPWForm-pw" type="password"
              placeholder="비밀번호를 입력해주세요"/>
          </div>

          <div>
            <label htmlFor="forgotPWForm-pwchk">새 비밀번호 확인</label>
            <input
              disabled={disabled}
              value={passwordCheck} onChange={(e) => setPasswordCheck(e.target.value)}
              id="forgotPWForm-pwchk" type="password"
              placeholder="비밀번호를 다시 한번 입력해주세요"/>
          </div>

          <button disabled={disabled} type="submit">
            {!disabled && '재설정'}
            {disabled && (
              <>
                <HashLoader size={20} />
                재설정 중...
              </>
            )}
          </button>
        </>
      )}
    </form>
  )
}

export default ForgotPWForm
