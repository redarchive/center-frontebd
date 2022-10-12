import React, { FormEvent, useState } from 'react'
import { HashLoader } from 'react-spinners'
import * as style from './style.module.scss'

export interface LoginFormData {
  id: string
  password: string
  remember: boolean
}

interface Props {
  onSubmit: (data: LoginFormData) => any
  disableSubmit: boolean
}

const LoginForm = ({ onSubmit, disableSubmit }: Props): JSX.Element => {
  const [id, setId] = useState('')
  const [password, setPassword] = useState('')
  const [remember, setRemember] = useState(false)

  const onFormSubmit = (e: FormEvent): void => {
    e.preventDefault()
    if (disableSubmit) return

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
          value={id} onChange={(e) => setId(e.target.value)}
          autoFocus id="loginForm-login"
          type="text" placeholder="아이디를 입력해주세요." />
      </div>

      <div>
        <label htmlFor="loginForm-pw">비밀번호</label>
        <input
          value={password} onChange={(e) => setPassword(e.target.value)}
          id="loginForm-pw" type="text"
          placeholder="비밀번호를 입력해주세요."/>
      </div>

      <div className={style.remindme}>
        <input
          checked={remember}
          onChange={(e) => setRemember(e.target.checked)}
          type="checkbox" name="remindme" id="loginForm-remindme" />

        <label htmlFor="loginForm-remindme">날 기억해줘!</label>
      </div>

      <button disabled={disableSubmit} type="submit">
        {!disableSubmit && '로그인'}
        {disableSubmit && (
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
