import { AnimatePresence } from 'framer-motion'
import React, { FormEvent, useState } from 'react'
import { HashLoader } from 'react-spinners'
import FadeIn from '../../commons/fadeIn'
import * as style from './style.module.scss'

export interface RegistFormData {
  id: string
  password: string
  passwordCheck: string
  phone: string
  phoneCheck: string
}

interface Props {
  onSubmit: (data: RegistFormData) => any
  disabled: boolean
  step: number
  message?: { [key: string]: string }
}

const RegistForm = ({ message, step, onSubmit, disabled }: Props): JSX.Element => {
  const [id, setId] = useState('')
  const [phone, setPhone] = useState('')
  const [phoneCheck, setPhoneCheck] = useState('')
  const [password, setPassword] = useState('')
  const [passwordCheck, setPasswordCheck] = useState('')

  const onFormSubmit = (e: FormEvent): void => {
    e.preventDefault()
    if (disabled) return

    onSubmit({
      id,
      password,
      passwordCheck,
      phone,
      phoneCheck
    })
  }

  return (
    <form onSubmit={onFormSubmit} className={style.registForm}>
      {[0, 1].includes(step) && (
        <div>
          <label htmlFor="registForm-phone">전화번호</label>
          <input
            disabled={disabled || step === 1}
            maxLength={11}
            autoFocus
            value={phone} onChange={(e) => setPhone(e.target.value.replace(/[^0-9]/g, ''))}
            id="registForm-phone" type="text"
            className={message?.phone ? style.invalid : ''}
            placeholder="전화번호를 입력해주세요. ( - 제외 )"/>

          <AnimatePresence>
            {message && <FadeIn><p>{message.phone}</p></FadeIn>}
          </AnimatePresence>
        </div>
      )}

      {step === 0 && (
        <button disabled={disabled} type="submit">
          {!disabled && '인증번호 전송'}
          {disabled && (
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
            <label htmlFor="registForm-phoneCheck">인증번호</label>
            <input
              disabled={disabled}
              maxLength={6}
              value={phoneCheck} onChange={(e) => setPhoneCheck(e.target.value.toUpperCase())}
              id="registForm-phoneCheck" type="text"
              autoFocus
              className={message?.phoneCheck ? style.invalid : ''}
              placeholder="인증번호를 입력해주세요. (6자리)"/>

            <AnimatePresence>
              {message && <FadeIn><p>{message.phoneCheck}</p></FadeIn>}
            </AnimatePresence>
          </div>

          <button disabled={disabled} type="submit">
            {!disabled && '전화번호 인증'}
            {disabled && (
              <>
                <HashLoader size={20} />
                전화번호 인증 중...
              </>
            )}
          </button>
        </>
      )}

      {step === 2 && (
        <>
          <div>
            <label htmlFor="registForm-id">아이디</label>
            <input
              disabled={disabled}
              value={id} onChange={(e) => setId(e.target.value)}
              autoFocus id="registForm-login"
              type="text" placeholder="아이디를 입력해주세요." />
          </div>

          <div>
            <label htmlFor="registForm-pw">비밀번호</label>
            <input
              disabled={disabled}
              value={password} onChange={(e) => setPassword(e.target.value)}
              id="registForm-pw"
              type="password" placeholder="비밀번호를 입력해주세요." />
          </div>

          <div>
            <label htmlFor="registForm-pwchk">비밀번호 확인</label>
            <input
              disabled={disabled}
              value={passwordCheck} onChange={(e) => setPasswordCheck(e.target.value)}
              id="registForm-pwchk" type="password"
              placeholder="비밀번호를 다시 한번 입력해주세요."/>
          </div>

          <button disabled={disabled} type="submit">
            {!disabled && '다음'}
            {disabled && (
              <>
                <HashLoader size={20} />
                처리중...
              </>
            )}
          </button>
        </>
      )}

    </form>
  )
}

export default RegistForm
