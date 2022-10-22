import React, { useState } from 'react'
import type { HeadFC } from 'gatsby'
import LoginHeader from '../components/login/header'
import Container from '../components/commons/container'
import LoginTypeSelector, { LoginSelectableTypes } from '../components/login/typeSelector'
import LoginLogoTitle from '../components/login/logoTitle'
import LoginForm, { LoginFormData } from '../components/login/form'
import LoginLinks from '../components/login/links'
import FadeIn from '../components/commons/fadeIn'

const LoginPage = (): JSX.Element => {
  const [selectedType, setSelectedType] = useState(LoginSelectableTypes.CURRENT_STUDENT)
  const [disabled, setDisabled] = useState(false)
  const [message, setMessage] = useState<{ [key: string]: string } | undefined>()

  const onSubmit = async (data: LoginFormData): Promise<void> => {
    setDisabled(true)
    setMessage(undefined)

    if (!data.id) {
      setDisabled(false)
      setMessage({
        id: '아이디를 입력해주세요.'
      })

      setTimeout(() => {
        setMessage(undefined)
      }, 3 * 1000)

      return
    }

    if (data.remember) {
      window.localStorage.setItem('saved_id', data.id)
    } else {
      window.localStorage.removeItem('saved_id')
    }

    if (!data.password) {
      setDisabled(false)
      setMessage({
        password: '비밀번호를 입력해주세요.'
      })

      setTimeout(() => {
        setMessage(undefined)
      }, 3 * 1000)

      return
    }

    const res = await fetch('/api/sessions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        login: data.id,
        password: data.password,
        type: LoginSelectableTypes[selectedType]
      })
    }).then(async (res) => await res.json())

    if (!res.success) {
      setDisabled(false)
      setMessage({
        id: '아이디 혹은 비밀번호가 잘못되었어요.',
        password: '아이디 혹은 비밀번호가 잘못되었어요.'
      })

      setTimeout(() => {
        setMessage(undefined)
      }, 3 * 1000)
    }
  }

  return (
    <main>
      <Container size="sm">
        <FadeIn>
          <LoginHeader />
          <LoginTypeSelector disabled={disabled} onSelect={(v) => setSelectedType(v)} />
          <LoginLogoTitle />
          <LoginForm message={message}onSubmit={onSubmit} disabled={disabled}/>
          <LoginLinks />
        </FadeIn>
      </Container>
    </main>
  )
}

export default LoginPage

export const Head: HeadFC = () =>
  <title>GBSW Center - 로그인</title>
