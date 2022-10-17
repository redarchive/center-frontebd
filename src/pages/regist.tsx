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
  const [step, setStep] = useState(0)
  const [disabled, setDisabled] = useState(false)
  const [phoneVerify, setPhoneVerify] = useState('')
  const [message, setMessage] = useState<{ [key: string]: string } | undefined>()

  const onSubmit = async (data: RegistFormData): Promise<void> => {
    setDisabled(true)
    setMessage(undefined)

    // 전화번호 인증 스탭
    if (step === 0) {
      if (!data.phone) {
        setDisabled(false)
        setMessage({
          phone: '전화번호를 입력해주세요.'
        })

        setTimeout(() => {
          setMessage(undefined)
        }, 3 * 1000)

        return
      }

      const res = await fetch('/api/phone-verify', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          phone: data.phone,
          type: RegistSelectableTypes[selectedType]
        })
      }).then(async (res) => await res.json()).catch(() => ({ success: false }))

      if (!res.success) {
        setDisabled(false)
        setMessage({
          phone: '등록되지 않은 전화번호입니다.'
        })

        setTimeout(() => {
          setMessage(undefined)
        }, 3 * 1000)
        return
      }

      setStep(1)
      setTimeout(() => {
        setStep((step) => step === 1 ? 0 : step)
      }, 5 * 60 * 1000)
      setDisabled(false)
    }

    // 인증번호 인증 스탭
    if (step === 1) {
      if (!data.phoneCheck) {
        setDisabled(false)
        setMessage({
          phoneCheck: '인증번호를 입력해주세요.'
        })

        setTimeout(() => {
          setMessage(undefined)
        }, 3 * 1000)

        return
      }

      const res = await fetch('/api/phone-verify', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          phone: data.phone,
          code: data.phoneCheck
        })
      }).then(async (res) => await res.json()).catch(() => ({ success: false }))

      if (!res.success) {
        setDisabled(false)
        setMessage({
          phoneCheck: '인증번호가 올바르지 않습니다.'
        })

        setTimeout(() => {
          setMessage(undefined)
        }, 3 * 1000)
        return
      }

      setPhoneVerify(res.data.signedKey)
      setStep(2)
      setDisabled(false)
    }

    console.log(data)
  }

  return (
    <main>
      <Container size="sm">
        <FadeIn>
          <RegistHeader />
          <RegistTypeSelector disabled={disabled} onSelect={(v) => {
            setStep(0)
            setSelectedType(v)
          }} />
          <RegistLogoTitle />
          <RegistForm message={message} step={step} onSubmit={onSubmit} disabled={disabled}/>
          <RegistLinks />
        </FadeIn>
      </Container>
    </main>
  )
}

export default RegistPage

export const Head: HeadFC = () =>
  <title>GBSW Center - 회원가입</title>
