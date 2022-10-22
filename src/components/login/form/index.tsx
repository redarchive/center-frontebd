import { AnimatePresence } from 'framer-motion'
import React, { FormEvent, useEffect, useState } from 'react'
import { HashLoader } from 'react-spinners'
import FadeIn from '../../commons/fadeIn'
import * as style from './style.module.scss'

export interface LoginFormData {
  id: string
  password: string
  remember: boolean
}

interface Props {
  onSubmit: (data: LoginFormData) => any
  disabled: boolean
  message?: { [key: string]: string }
}

const LoginForm = ({ message, onSubmit, disabled }: Props): JSX.Element => {
  const [id, setId] = useState('')
  const [password, setPassword] = useState('')
  const [remember, setRemember] = useState(false)

  useEffect(() => {
    const savedId = window.localStorage.getItem('saved_id')
    if (savedId !== null) {
      setId(savedId)
      setRemember(true)
    }
  }, [])

  const onFormSubmit = (e: FormEvent): void => {
    e.preventDefault()
    if (disabled) return

    onSubmit({
      id,
      password,
      remember
    })
  }

  return (
    <form onSubmit={onFormSubmit} className={style.loginForm}>
      <div>
        <label htmlFor="loginForm-login">아이디</label>
        <input
          disabled={disabled}
          value={id} onChange={(e) => setId(e.target.value)}
          autoFocus id="loginForm-login"
          className={message?.id ? style.invalid : ''}
          autoComplete="off"
          type="text" placeholder="아이디를 입력해주세요." />

        <AnimatePresence>
          {message && <FadeIn><p>{message.id}</p></FadeIn>}
        </AnimatePresence>
      </div>

      <div>
        <label htmlFor="loginForm-pw">비밀번호</label>
        <input
          disabled={disabled}
          value={password} onChange={(e) => setPassword(e.target.value)}
          id="loginForm-pw" type="password"
          autoComplete="off"
          className={message?.password ? style.invalid : ''}
          placeholder="비밀번호를 입력해주세요."/>

        <AnimatePresence>
          {message && <FadeIn><p>{message.password}</p></FadeIn>}
        </AnimatePresence>
      </div>

      <div className={style.remindme}>
        <input
          disabled={disabled}
          checked={remember}
          onChange={(e) => setRemember(e.target.checked)}
          type="checkbox" name="remember" id="loginForm-remember" />

        <label htmlFor="loginForm-remember">날 기억해줘!</label>
      </div>

      <button disabled={disabled} type="submit">
        {!disabled && '로그인'}
        {disabled && (
          <>
            <HashLoader size={20} />
            로그인 중...
          </>
        )}
      </button>
    </form>
  )
}

export default LoginForm
