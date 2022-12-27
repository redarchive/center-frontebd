import { AnimatePresence } from 'framer-motion'
import React, { FormEvent, useState } from 'react'
import { HashLoader } from 'react-spinners'
import FadeIn from '../../commons/fadeIn'
import * as style from './style.module.scss'

export interface ForgotPWFormData {
  phone: string
  code: string
  password: string
  passwordCheck: string
}

interface Props {
  onSubmit: (data: ForgotPWFormData) => any
  disabled: boolean
  step?: number
  message?: { [key: string]: string }
  login: string
}

const ForgotPWForm = ({ login = '', onSubmit, disabled, step = 0, message }: Props): JSX.Element => {
  const [code, setCode] = useState('')
  const [phone, setPhone] = useState('')
  const [password, setPassword] = useState('')
  const [passwordCheck, setPasswordCheck] = useState('')

  const onFormSubmit = (e: FormEvent): void => {
    e.preventDefault()
    if (disabled) return

    onSubmit({
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
            <label htmlFor="forgotPWForm-phone">전화번호</label>
            <input
              disabled={disabled || step > 0}
              value={phone} onChange={(e) => setPhone(e.target.value.replace(/[^\d]/g, ''))}
              id="forgotPWForm-phone" type="text"
              autoFocus
              autoComplete='off'
              className={message?.phone ? style.invalid : ''}
              placeholder="전화번호를 입력해주세요 ( - 제외 )"/>

            <AnimatePresence>
              {message && <FadeIn><p>{message.phone}</p></FadeIn>}
            </AnimatePresence>
          </div>

        </>
      )}

      {step === 0 && (
        <button disabled={disabled || step > 0} type="submit">
          {!(disabled || step > 0) && '인증번호 전송'}
          {(disabled || step > 0) && (
            <>
              <HashLoader size={20} />
              인증번호 전송 중...
            </>
          )}
        </button>
      )}

      {step === 1 && (
        <>
          <div>
            <label htmlFor="forgotPWForm-code">인증코드</label>
            <input
              disabled={disabled}
              value={code} onChange={(e) => setCode(e.target.value.toUpperCase())}
              id="forgotPWForm-code" type="text"
              autoFocus
              autoComplete='off'
              className={message?.code ? style.invalid : ''}
              placeholder="인증코드를 입력해주세요"/>

            <AnimatePresence>
              {message && <FadeIn><p>{message.code}</p></FadeIn>}
            </AnimatePresence>
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
            <label htmlFor="forgotPWForm-id">아이디</label>
            <input type="text" disabled value={login} />
          </div>

          <div>
            <label htmlFor="forgotPWForm-pw">새 비밀번호</label>
            <input
              disabled={disabled}
              value={password} onChange={(e) => setPassword(e.target.value)}
              id="forgotPWForm-pw" type="password"
              autoFocus
              className={message?.password ? style.invalid : ''}
              placeholder="비밀번호를 입력해주세요"/>

            <AnimatePresence>
              {message && <FadeIn><p>{message.password}</p></FadeIn>}
            </AnimatePresence>
          </div>

          <div>
            <label htmlFor="forgotPWForm-pwchk">새 비밀번호 확인</label>
            <input
              disabled={disabled}
              value={passwordCheck} onChange={(e) => setPasswordCheck(e.target.value)}
              id="forgotPWForm-pwchk" type="password"
              className={message?.passwordCheck ? style.invalid : ''}
              placeholder="비밀번호를 다시 한번 입력해주세요"/>

            <AnimatePresence>
              {message && <FadeIn><p>{message.passwordCheck}</p></FadeIn>}
            </AnimatePresence>
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
