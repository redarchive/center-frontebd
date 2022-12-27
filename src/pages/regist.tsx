import React, { useEffect, useState } from 'react'
import { HeadFC, navigate } from 'gatsby'
import Container from '../components/commons/container'
import FadeIn from '../components/commons/fadeIn'
import RegistHeader from '../components/regist/header'
import RegistTypeSelector, { RegistSelectableTypes } from '../components/regist/typeSelector'
import RegistLogoTitle from '../components/regist/logoTitle'
import RegistForm, { RegistFormData } from '../components/regist/form'
import RegistLinks from '../components/regist/links'
import toast from 'react-hot-toast'

const RegistPage = (): JSX.Element => {
  const [selectedType, setSelectedType] = useState(RegistSelectableTypes.CURRENT_STUDENT)
  const [step, setStep] = useState(0)
  const [disabled, setDisabled] = useState(false)
  const [phoneVerify, setPhoneVerify] = useState('')
  const [message, setMessage] = useState<{ [key: string]: string } | undefined>()

  const formatType = (selectedType: RegistSelectableTypes): string => ({
    [RegistSelectableTypes.CURRENT_STUDENT]: '재학생',
    [RegistSelectableTypes.TEACHER]: '교사'
  })[selectedType]

  const onSubmit = async (data: RegistFormData): Promise<void> => {
    setDisabled(true)
    setMessage(undefined)

    // 전화번호 인증 스탭
    if (step === 0) {
      if (!data.phone) {
        setDisabled(false)
        setMessage({
          phone: formatType(selectedType) + ' 전화번호를 입력해주세요.'
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
          phone: '등록되지 않은 ' + formatType(selectedType) + ' 전화번호에요.'
        })

        setTimeout(() => {
          setMessage(undefined)
        }, 3 * 1000)
        return
      }

      setStep(1)
      setTimeout(() => {
        setStep((step) => step === 1 ? 0 : step)
      }, 10 * 60 * 1000)
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

      const cf = data.phoneCheck.match(/[^\dA-F]/g)
      if (cf?.length) {
        setDisabled(false)
        setMessage({
          phoneCheck: `"${cf[0]}"는 사용할 수 없어요. 영문(A~F) 혹은 숫자만 가능해요.`
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
          code: data.phoneCheck
        })
      }).then(async (res) => await res.json()).catch(() => ({ success: false }))

      if (!res.success) {
        setDisabled(false)
        setMessage({
          phoneCheck: '인증번호가 올바르지 않아요.'
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
      if (data.id.length < 5) {
        setMessage({
          login: '아이디는 5자 이상으로 해주세요.'
        })

        setTimeout(() => {
          setMessage(undefined)
        }, 3 * 1000)
        setDisabled(false)
        return
      }

      if (data.id.length > 30) {
        setMessage({
          login: '아이디는 30자 보다 길 수 없어요.'
        })

        setTimeout(() => {
          setMessage(undefined)
        }, 3 * 1000)
        setDisabled(false)
        return
      }

      const cf = data.id.match(/[^ -~]/g)
      if (cf?.length) {
        setDisabled(false)
        setMessage({
          login: `"${cf[0]}"는 사용할 수 없어요. 영문, 숫자, 특수문자만 가능해요.`
        })
        return
      }

      if (data.password.length < 8) {
        setMessage({
          pw: '비밀번호는 10자 이상으로 해주세요.'
        })

        setTimeout(() => {
          setMessage(undefined)
        }, 3 * 1000)
        setDisabled(false)
        return
      }

      if (data.password.length > 30) {
        setMessage({
          pw: '비밀번호는 30자 보다 길 수 없어요.'
        })

        setTimeout(() => {
          setMessage(undefined)
        }, 3 * 1000)
        setDisabled(false)
        return
      }

      if (!data.password.match(/\d/g)) {
        setMessage({
          pw: '비밀번호에 숫자를 추가해주세요.'
        })

        setTimeout(() => {
          setMessage(undefined)
        }, 3 * 1000)
        setDisabled(false)
        return
      }

      if (!data.password.match(/[A-ZaZ]/g)) {
        setMessage({
          pw: '비밀번호에 영문을 추가해주세요.'
        })

        setTimeout(() => {
          setMessage(undefined)
        }, 3 * 1000)
        setDisabled(false)
        return
      }

      if (data.password !== data.passwordCheck) {
        setMessage({
          pw: '비밀번호가 비밀번호 확인과 일치하지 않아요',
          pwchk: '비밀번호 확인이 비밀번호와 일치하지 않아요.'
        })

        setTimeout(() => {
          setMessage(undefined)
        }, 3 * 1000)
        setDisabled(false)
        return
      }

      setStep(3)
      setDisabled(false)
    }

    if (step === 3) {
      if (data.useEmail && data.email.length > 30) {
        setMessage({
          email: '이런! 30자 이상의 이메일 주소는 지원하지 않아요.'
        })

        setTimeout(() => {
          setMessage(undefined)
        }, 3 * 1000)
        setDisabled(false)
        return
      }

      if (data.useNickname && data.nickname.length < 2) {
        setMessage({
          nickname: '닉네임을 최소 2자 이상 입력해주세요.'
        })

        setTimeout(() => {
          setMessage(undefined)
        }, 3 * 1000)
        setDisabled(false)
        return
      }

      if (data.useNickname && data.nickname.length > 30) {
        setMessage({
          nickname: '닉네임은 30자를 넘길 수 없어요.'
        })

        setTimeout(() => {
          setMessage(undefined)
        }, 3 * 1000)
        setDisabled(false)
        return
      }

      const result = await fetch('/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          login: data.id,
          nickname: data.useNickname ? data.nickname : undefined,
          email: data.useEmail ? data.email : undefined,
          phone: data.phone,
          phoneVerify,
          password: data.password,
          type: RegistSelectableTypes[selectedType]
        })
      }).then(async (res) => await res.json())

      if (result.success) {
        toast.success('회원가입 완료!', {
          style: {
            borderRadius: '10px',
            background: '#333',
            color: '#fff'
          }
        })
        await navigate('/login' + window.location.search)
        return
      }

      if (result.message === 'USER_ALREADY_EXIST') {
        setStep(2)
        setDisabled(false)

        setMessage({
          login: '이미 사용중인 아이디에요.'
        })

        setTimeout(() => {
          setMessage(undefined)
        }, 3 * 1000)
        return
      }

      if (result.message === 'VERIFY_INVALID') {
        setStep(0)
        setDisabled(false)

        setMessage({
          phone: '인증이 만료되었어요. 다시 인증해주세요.'
        })

        setTimeout(() => {
          setMessage(undefined)
        }, 3 * 1000)
      }

      if (result.message === 'USER_ALREADY_ASSOCIATED') {
        setStep(0)
        setDisabled(false)

        setMessage({
          phone: '이미 이 전화번호와 연결된 아이디가 있어요. (1인당 1아이디)'
        })

        setTimeout(() => {
          setMessage(undefined)
        }, 3 * 1000)
      }
    }
  }

  useEffect(() => {
    setStep(0)
  }, [selectedType])

  return (
    <>
      <Container size="sm">
        <FadeIn>
          <RegistHeader />
          <RegistTypeSelector disabled={disabled} onSelect={setSelectedType} />
          <RegistLogoTitle />
          <RegistForm message={message} step={step} onSubmit={onSubmit} disabled={disabled}/>
          <RegistLinks />
        </FadeIn>
      </Container>
    </>
  )
}

export default RegistPage

export const Head: HeadFC = () =>
  <title>GBSW 통합로그인 - 회원가입</title>
