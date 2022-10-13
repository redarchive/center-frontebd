import React, { useState } from 'react'
import type { HeadFC } from 'gatsby'
import Container from '../components/commons/container'
import FadeIn from '../components/commons/fadeIn'
import ForgotPWHeader from '../components/forgotpw/header'
import ForgotPWTypeSelector, { ForgotPWSelectableTypes } from '../components/forgotpw/typeSelector'
import ForgotPWForm, { ForgotPWFormData } from '../components/forgotpw/form'
import ForgotPWLogoTitle from '../components/forgotpw/logoTitle'
import ForgotPWLinks from '../components/forgotpw/links'

const ForgotPWPage = (): JSX.Element => {
  const [selectedType, setSelectedType] = useState(ForgotPWSelectableTypes.CURRENT_STUDENT)
  const [disabled, setDisabled] = useState(false)
  const [step, setStep] = useState(0)

  const onSubmit = async (data: ForgotPWFormData): Promise<void> => {
    setDisabled(false)
    setStep(2)
    console.log(data)
  }

  return (
    <main>
      <Container size="sm">
        <FadeIn>
          <ForgotPWHeader />
          <ForgotPWTypeSelector disabled={disabled} onSelect={(v) => setSelectedType(v)} />
          <ForgotPWLogoTitle />
          <ForgotPWForm step={step} onSubmit={onSubmit} disabled={disabled}/>
          <ForgotPWLinks />
        </FadeIn>
      </Container>
    </main>
  )
}

export default ForgotPWPage

export const Head: HeadFC = () =>
  <title>GBSW Center - 비밀번호 재설정</title>
