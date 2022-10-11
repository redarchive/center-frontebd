import React, { useState } from 'react'
import type { HeadFC } from 'gatsby'
import LoginHeader from '../components/login/header'
import Container from '../components/commons/container'
import LoginTypeSelector, { LoginSelectableTypes } from '../components/login/typeSelector'
import LogoTitle from '../components/login/logoTitle'
import LoginForm from '../components/login/form'
import LoginLinks from '../components/login/links'

const LoginPage = (): JSX.Element => {
  const [selectedType, setSelectedType] = useState(LoginSelectableTypes.CURRENT_STUDENT)

  return (
    <main>
      <Container size="sm">
        <LoginHeader />
        <LoginTypeSelector onSelect={(v) => setSelectedType(v)} />
        <LogoTitle />
        <LoginForm />
        <LoginLinks />
      </Container>
    </main>
  )
}

export default LoginPage

export const Head: HeadFC = () =>
  <title>GBSW Center - Login</title>
