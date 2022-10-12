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
  const [disableSubmit, setDisableSubmit] = useState(false)

  const onSubmit = async (data: RegistFormData): Promise<void> => {
    setDisableSubmit(true)
    console.log(data)
  }

  return (
    <main>
      <Container size="sm">
        <FadeIn>
          <RegistHeader />
          <RegistTypeSelector onSelect={(v) => setSelectedType(v)} />
          <RegistLogoTitle type={selectedType} />
          <RegistForm onSubmit={onSubmit} disableSubmit={disableSubmit}/>
          <RegistLinks />
        </FadeIn>
      </Container>
    </main>
  )
}

export default RegistPage

export const Head: HeadFC = () =>
  <title>GBSW Center - 회원가입</title>
