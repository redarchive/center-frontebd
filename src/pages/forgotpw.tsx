import React, { useEffect, useState } from 'react'
import { HeadFC, navigate } from 'gatsby'
import Container from '../components/commons/container'
import FadeIn from '../components/commons/fadeIn'
import ForgotPWHeader from '../components/forgotpw/header'
import ForgotPWTypeSelector, { ForgotPWSelectableTypes } from '../components/forgotpw/typeSelector'
import ForgotPWForm, { ForgotPWFormData } from '../components/forgotpw/form'
import ForgotPWLogoTitle from '../components/forgotpw/logoTitle'
import ForgotPWLinks from '../components/forgotpw/links'
import toast from 'react-hot-toast'

const ForgotPWPage = (): JSX.Element => {
  const [selectedType, setSelectedType] = useState(ForgotPWSelectableTypes.CURRENT_STUDENT)
  const [disabled, setDisabled] = useState(false)
  const [step, setStep] = useState(0)
  const [id, setId] = useState('')
  const [message, setMessage] = useState<{ [key: string]: string } | undefined>()
  const [phoneVerify, setPhoneVerify] = useState('')

  const onSubmit = async (data: ForgotPWFormData): Promise<void> => {
    setDisabled(true)
    if (disabled) return

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
          type: ForgotPWSelectableTypes[selectedType]
        })
      }).then(async (res) => await res.json()).catch(() => ({ success: false }))

      if (!res.success) {
        setDisabled(false)
        setMessage({
          phone: '등록되지 않은 전화번호에요.'
        })

        setTimeout(() => {
          setMessage(undefined)
        }, 3 * 1000)
        return
      }

      if (!res.data.login) {
        setDisabled(false)
        setMessage({
          phone: '이 전화번호로 등록된 아이디가 없어요.'
        })

        setTimeout(() => {
          setMessage(undefined)
        }, 3 * 1000)
        return
      }

      setId(res.data.login)
      setStep(1)
      setTimeout(() => {
        setStep((step) => step === 1 ? 0 : step)
      }, 5 * 60 * 1000)
      setDisabled(false)
    }

    // 인증번호 인증 스탭
    if (step === 1) {
      if (!data.code) {
        setDisabled(false)
        setMessage({
          code: '인증번호를 입력해주세요.'
        })

        setTimeout(() => {
          setMessage(undefined)
        }, 3 * 1000)

        return
      }

      const cf = data.code.match(/[^\dA-F]/g)
      if (cf?.length) {
        setDisabled(false)
        setMessage({
          code: `"${cf[0]}"는 사용할 수 없어요. 영문(A~F) 혹은 숫자만 가능해요.`
        })
        return
      }

      const res = await fetch('/api/phone-verify', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          phone: data.phone,
          code: data.code
        })
      }).then(async (res) => await res.json()).catch(() => ({ success: false }))

      if (!res.success) {
        setDisabled(false)
        setMessage({
          code: '인증번호가 올바르지 않아요.'
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

    if (step === 2) {
      if (data.password.length < 8) {
        setMessage({
          password: '비밀번호는 10자 이상으로 해주세요.'
        })

        setTimeout(() => {
          setMessage(undefined)
        }, 3 * 1000)
        setDisabled(false)
        return
      }

      if (data.password.length > 30) {
        setMessage({
          password: '비밀번호는 30자 보다 길 수 없어요.'
        })

        setTimeout(() => {
          setMessage(undefined)
        }, 3 * 1000)
        setDisabled(false)
        return
      }

      if (!data.password.match(/\d/g)) {
        setMessage({
          password: '비밀번호에 숫자를 추가해주세요.'
        })

        setTimeout(() => {
          setMessage(undefined)
        }, 3 * 1000)
        setDisabled(false)
        return
      }

      if (!data.password.match(/[A-ZaZ]/g)) {
        setMessage({
          password: '비밀번호에 영문을 추가해주세요.'
        })

        setTimeout(() => {
          setMessage(undefined)
        }, 3 * 1000)
        setDisabled(false)
        return
      }

      if (data.password !== data.passwordCheck) {
        setMessage({
          password: '비밀번호가 비밀번호 확인과 일치하지 않아요',
          passwordCheck: '비밀번호 확인이 비밀번호와 일치하지 않아요.'
        })

        setTimeout(() => {
          setMessage(undefined)
        }, 3 * 1000)
        setDisabled(false)
        return
      }

      const result = await fetch('/api/users/@unknown', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          login: id,
          phoneVerify,
          newPassword: data.password
        })
      }).then(async (res) => await res.json())

      if (result.success) {
        toast.success('비밀번호 재설정 완료!', {
          style: {
            borderRadius: '10px',
            background: '#333',
            color: '#fff'
          }
        })

        await navigate('/login' + window.location.search)
      }
    }
  }

  useEffect(() => {
    setStep(0)
  }, [selectedType])

  return (
    <main>
      <Container size="sm">
        <FadeIn>
          <ForgotPWHeader />
          <ForgotPWTypeSelector disabled={disabled} onSelect={setSelectedType} />
          <ForgotPWLogoTitle />
          <ForgotPWForm message={message} id={id} step={step} onSubmit={onSubmit} disabled={disabled}/>
          <ForgotPWLinks />
        </FadeIn>
      </Container>
    </main>
  )
}

export default ForgotPWPage

export const Head: HeadFC = () =>
  <title>GBSW Center - 비밀번호 재설정</title>
