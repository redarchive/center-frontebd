import { AnimatePresence } from 'framer-motion'
import React, { FormEvent, useState } from 'react'
import { HashLoader } from 'react-spinners'
import FadeIn from '../../commons/fadeIn'
import { FaRocket } from 'react-icons/fa'
import * as style from './style.module.scss'

export interface RegistFormData {
  id: string
  password: string
  passwordCheck: string
  phone: string
  phoneCheck: string
  nickname: string
  email: string
  useEmail: boolean
  useNickname: boolean
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
  const [nickname, setNickname] = useState('')
  const [email, setEmail] = useState('')
  const [useNickname, setUseNickname] = useState(false)
  const [useEmail, setUseEmail] = useState(false)

  const onFormSubmit = (e: FormEvent): void => {
    e.preventDefault()
    if (disabled) return

    onSubmit({
      id,
      password,
      passwordCheck,
      phone,
      phoneCheck,
      nickname,
      email,
      useEmail,
      useNickname
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
            autoComplete="off"
            value={phone} onChange={(e) => setPhone(e.target.value.replace(/[^\d]/g, ''))}
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
              autoComplete="off"
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
              className={message?.login ? style.invalid : ''}
              autoFocus id="registForm-login"
              autoComplete="off"
              type="text" placeholder="아이디를 입력해주세요." />

            <AnimatePresence>
              {message && <FadeIn><p>{message.login}</p></FadeIn>}
            </AnimatePresence>
          </div>

          <div>
            <label htmlFor="registForm-pw">비밀번호</label>
            <input
              disabled={disabled}
              value={password} onChange={(e) => setPassword(e.target.value)}
              id="registForm-pw"
              autoComplete="off"
              className={message?.pw ? style.invalid : ''}
              type="password" placeholder="비밀번호를 입력해주세요." />

            <AnimatePresence>
              {message && <FadeIn><p>{message.pw}</p></FadeIn>}
            </AnimatePresence>
          </div>

          <div>
            <label htmlFor="registForm-pwchk">비밀번호 확인</label>
            <input
              disabled={disabled}
              value={passwordCheck} onChange={(e) => setPasswordCheck(e.target.value)}
              id="registForm-pwchk" type="password"
              autoComplete="off"
              className={message?.pwchk ? style.invalid : ''}
              placeholder="비밀번호를 다시 한번 입력해주세요."/>

            <AnimatePresence>
              {message && <FadeIn><p>{message.pwchk}</p></FadeIn>}
            </AnimatePresence>
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

      {step === 3 && (
        <>
          <div>
            <label htmlFor="registForm-nickname">닉네임 (선택)</label>
            <div>
              <input
                disabled={disabled || !useNickname}
                value={useNickname ? nickname : id} onChange={(e) => setNickname(e.target.value)}
                className={message?.nickname ? style.invalid : ''}
                autoFocus id="registForm-nickname"
                autoComplete="off"
                type="text" placeholder="실명 대신 당신을 누구라고 부를까요?" />

              <AnimatePresence>
                {message && <FadeIn><p>{message.nickname}</p></FadeIn>}
              </AnimatePresence>
            </div>
            <div className={style.remindme}>
              <input
                disabled={disabled}
                checked={!useNickname}
                onChange={(e) => setUseNickname(!e.target.checked)}
                type="checkbox" name="useNickname" id="registForm-useNickname" />

              <label htmlFor="registForm-useNickname">아이디를 닉네임으로 쓸래요</label>
            </div>
          </div>

          <div>
            <label htmlFor="registForm-email">이메일 (선택)</label>
            <input
              disabled={disabled || !useEmail}
              value={useEmail ? email : `${id}@gbsw.hs.kr`} onChange={(e) => setEmail(e.target.value)}
              id="registForm-email"
              autoComplete="off"
              className={message?.email ? style.invalid : ''}
              type="email" placeholder="이메일을 입력해주세요." />

            <div className={style.remindme}>
              <input
                disabled={disabled}
                checked={!useEmail}
                onChange={(e) => setUseEmail(!e.target.checked)}
                type="checkbox" name="useEmail" id="registForm-useEmail" />

              <label htmlFor="registForm-useEmail">익명 이메일을 사용할래요</label>
            </div>

            <AnimatePresence>
              {message && <FadeIn><p>{message.email}</p></FadeIn>}
            </AnimatePresence>
          </div>

          <button disabled={disabled} type="submit">
            {!disabled && <FaRocket size={15} />}
            {disabled && (
              <>
                <HashLoader size={20} />
                계정 생성중...
              </>
            )}
          </button>
        </>
      )}
    </form>
  )
}

export default RegistForm
