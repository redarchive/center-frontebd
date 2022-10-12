import React, { useState } from 'react'
import type { HeadFC } from 'gatsby'
import Container from '../components/commons/container'
import FadeIn from '../components/commons/fadeIn'
import RegistHeader from '../components/regist/header'
import RegistTypeSelector, { RegistSelectableTypes } from '../components/regist/typeSelector'
import RegistLogoTitle from '../components/regist/logoTitle'
import RegistForm, { RegistFormData } from '../components/regist/form'
import RegistLinks from '../components/regist/links'

const RegistPage = (): JSX.Element => {
  const [selectedType, setSelectedType] = useState(RegistSelectableTypes.CURRENT_STUDENT)
  const [disabled, setDisabled] = useState(false)

  const onSubmit = async (data: RegistFormData): Promise<void> => {
    setDisabled(true)
    console.log(data)
  }

  return (
    <main>
      <Container size="sm">
        <FadeIn>
          <RegistHeader />
          <RegistTypeSelector disabled={disabled} onSelect={(v) => setSelectedType(v)} />
          <RegistLogoTitle type={selectedType} />
          <RegistForm onSubmit={onSubmit} disabled={disabled}/>
          <RegistLinks />
        </FadeIn>
      </Container>
    </main>
  )
}

export default RegistPage

export const Head: HeadFC = () =>
  <title>GBSW Center - 회원가입</title>
