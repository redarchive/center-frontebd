import React from 'react'
import * as style from './style.module.scss'

const LoginForm = (): JSX.Element => {
  return (
    <form className={style.loginForm}>
      <div>
      <label htmlFor="loginForm-login">아이디</label>
      <input autoFocus id="loginForm-login" type="text" placeholder="아이디를 입력해주세요."/>

      </div>

      <div>
      <label htmlFor="loginForm-pw">비밀번호</label>
      <input id="loginForm-pw" type="text" placeholder="비밀번호를 입력해주세요."/>

      </div>

      <div className={style.remindme}>
        <input type="checkbox" name="remindme" id="loginForm-remindme" />
        <label htmlFor="loginForm-remindme">날 기억해줘!</label>
      </div>

      <input type="submit" value="로그인" />
    </form>
  )
}

export default LoginForm
