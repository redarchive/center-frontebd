import React from 'react'
import { useSearchParam } from 'react-use'
import { header as headerStyle } from './style.module.scss'

interface Props {
  client: any
}

const LoginHeader = ({ client }: Props): JSX.Element => {
  const scope = useSearchParam('scope') ?? ''

  const labelScope = (scope: string): string => ({
    openid: '식별번호',
    real_name: '실명',
    email: '이메일',
    phone_number: '전화번호',
    gender: '성별',
    class_info: '학번',
    dormitory: '기숙사정보'
  })[scope] ?? '알수없음'

  return (
    <header className={headerStyle}>
      <h1>{client.name}(으)로 로그인할게요.</h1>
      <h2>요청한 정보: {scope.split(' ').map(labelScope).join(', ')}</h2>
    </header>
  )
}

export default LoginHeader
