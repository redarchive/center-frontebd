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
  const [disableSubmit, setDisableSubmit] = useState(false)

  const onSubmit = async (data: LoginFormData): Promise<void> => {
    setDisableSubmit(true)
    console.log(data)
  }

  return (
    <main>
      <Container size="sm">
        <FadeIn>
          <LoginHeader />
          <LoginTypeSelector onSelect={(v) => setSelectedType(v)} />
          <LoginLogoTitle type={selectedType} />
          <LoginForm onSubmit={onSubmit} disableSubmit={disableSubmit}/>
          <LoginLinks />
        </FadeIn>
      </Container>
    </main>
  )
}

export default LoginPage

export const Head: HeadFC = () =>
  <title>GBSW Center - 로그인</title>
