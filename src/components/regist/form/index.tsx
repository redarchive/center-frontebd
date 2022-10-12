import React, { FormEvent, useState } from 'react'
import { HashLoader } from 'react-spinners'
import * as style from './style.module.scss'

export interface RegistFormData {
  id: string
  password: string
  passwordCheck: string
  phone: string
}

interface Props {
  onSubmit: (data: RegistFormData) => any
  disableSubmit: boolean
}

const RegistForm = ({ onSubmit, disableSubmit }: Props): JSX.Element => {
  const [id, setId] = useState('')
  const [phone, setPhone] = useState('')
  const [password, setPassword] = useState('')
  const [passwordCheck, setPasswordCheck] = useState('')

  const onFormSubmit = (e: FormEvent): void => {
    e.preventDefault()
    if (disableSubmit) return

    onSubmit({
      id,
      password,
      passwordCheck,
      phone
    })
  }

  return (
    <form onSubmit={onFormSubmit} className={style.registForm}>
      <div>
        <label htmlFor="registForm-id">아이디</label>
        <input
          value={id} onChange={(e) => setId(e.target.value)}
          autoFocus id="registForm-login"
          type="text" placeholder="아이디를 입력해주세요." />
      </div>

      <div>
        <label htmlFor="registForm-phone">전화번호</label>
        <input
          value={phone} onChange={(e) => setPhone(e.target.value)}
          id="registForm-phone" type="text"
          placeholder="전화번호를 입력해주세요. ( - 제외 )"/>
      </div>

      <div>
        <label htmlFor="registForm-pw">비밀번호</label>
        <input
          value={password} onChange={(e) => setPassword(e.target.value)}
          autoFocus id="registForm-pw"
          type="text" placeholder="비밀번호를 입력해주세요." />
      </div>

      <div>
        <label htmlFor="registForm-pwchk">비밀번호 확인</label>
        <input
          value={passwordCheck} onChange={(e) => setPasswordCheck(e.target.value)}
          id="registForm-pwchk" type="text"
          placeholder="비밀번호를 다시 한번 입력해주세요."/>
      </div>

      <button disabled={disableSubmit} type="submit">
        {!disableSubmit && '회원가입'}
        {disableSubmit && (
          <>
            <HashLoader size={20} />
            회원가입 중...
          </>
        )}
      </button>
    </form>
  )
}

export default RegistForm
