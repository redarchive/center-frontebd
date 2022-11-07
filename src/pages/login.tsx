import React, { useEffect, useState } from 'react'
import type { HeadFC } from 'gatsby'
import LoginHeader from '../components/login/header'
import Container from '../components/commons/container'
import LoginTypeSelector, { LoginSelectableTypes } from '../components/login/typeSelector'
import LoginLogoTitle from '../components/login/logoTitle'
import LoginForm, { LoginFormData } from '../components/login/form'
import LoginLinks from '../components/login/links'
import FadeIn from '../components/commons/fadeIn'
import CriticalMessage from '../components/login/criticalMessage'
import { useSearchParam } from 'react-use'

const LoginPage = (): JSX.Element => {
  const clientId = useSearchParam('client_id')
  const redirectUri = useSearchParam('redirect_uri')
  const scope = useSearchParam('scope')
  const responseType = useSearchParam('response_type')
  const state = useSearchParam('state')

  const [selectedType, setSelectedType] = useState(LoginSelectableTypes.CURRENT_STUDENT)
  const [disabled, setDisabled] = useState(true)
  const [message, setMessage] = useState<{ [key: string]: string } | undefined>()
  const [me, setMe] = useState(undefined)
  const [client, setClient] = useState(undefined)
  const [criticalMessage, setCriticalMessage] = useState<string | undefined>(undefined)

  const fetchMe = async (): Promise<void> => {
    const result = await fetch('/api/users/@me')
      .then(async (res) => await res.json())

    if (!result?.data?.me) {
      setDisabled(false)
      return
    }

    setMe(result.data.me)
  }

  const fetchClient = async (): Promise<void> => {
    if (clientId === null) {
      setCriticalMessage('CRITICAL ERROR:\n`client_id` not provided.')
      return
    }

    if (redirectUri === null) {
      setCriticalMessage('CRITICAL ERROR:\n`redirect_uri` not provided.')
      return
    }

    if (redirectUri === null) {
      setCriticalMessage('CRITICAL ERROR:\n`redirect_uri` not provided.')
      return
    }

    if (redirectUri === null) {
      setCriticalMessage('CRITICAL ERROR:\n`redirect_uri` not provided.')
      return
    }

    if (scope === null) {
      setCriticalMessage('CRITICAL ERROR:\n`scope` not provided.')
      return
    }

    if (responseType === null) {
      setCriticalMessage('CRITICAL ERROR:\n`response_type` not provided.')
      return
    }

    if (responseType !== 'code') {
      setCriticalMessage('CRITICAL ERROR:\n`response_type` only supports `code`')
      return
    }

    const scopes = scope.split(' ')
    if (!scopes.includes('openid')) {
      setCriticalMessage('CRITICAL ERROR:\n`scope` must have `openid` string')
      return
    }

    const result = await fetch(`/api/clients/${clientId}`)
      .then(async (res) => await res.json())

    if (!result?.data?.client) {
      setCriticalMessage('CRITICAL ERROR:\nClient not found. please check `client_id`')
      return
    }

    if (!result.data.client.redirectUris.find((v: any) => v.uri === redirectUri)) {
      setCriticalMessage('CRITICAL ERROR:\nProven `redirectUri` was not registed.')
      return
    }

    for (const scope of scopes) {
      if (!result.data.client.scopes.find((v: any) => v.type.toLowerCase() === scope)) {
        setCriticalMessage(`CRITICAL_ERROR:\n\`${scope}\` scope is disabled on this client`)
        return
      }
    }

    setClient(result.data.client)
  }

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
      return
    }

    void fetchMe()
  }

  useEffect(() => {
    void fetchMe()
    void fetchClient()
  }, [])

  return (
    <main>
      <Container size="sm">
        <FadeIn>
          {client && <LoginHeader client={client} />}
          <LoginTypeSelector disabled={disabled} onSelect={(v) => setSelectedType(v)} />
          <LoginLogoTitle />

          {!criticalMessage && <>
            {!me && (
              <LoginForm message={message} onSubmit={onSubmit} disabled={disabled}/>
            )}
            <LoginLinks />
          </>}

          {criticalMessage && (
            <CriticalMessage message={criticalMessage}/>
          )}
        </FadeIn>
      </Container>
    </main>
  )
}

export default LoginPage

export const Head: HeadFC = () =>
  <title>GBSW Center - 로그인</title>
