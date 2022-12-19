import React from 'react'
import * as style from './style.module.scss'

const Client = ({ data }: any): JSX.Element => {
  const scopeEnum = ['OPENID', 'REAL_NAME', 'EMAIL', 'PHONE_NUMBER', 'GENDER', 'CLASS_INFO', 'DORMITORY']

  return (
    <div className={style.item__textbox}>
      <div className={style.title}>통합로그인서비스(SSO) 정보</div>
      {data.clients.length < 1 && (
        <div className={style.day}>
          <p>등록된 클라이언트가 없습니다. <a href={`#edit-${data.id as string}`}>추가하기.</a></p>
        </div>
      )}
      {(data.clients ?? []).map((v: any, i: number) => (
        <div className={style.day} key={i}>
          <div>&quot;{v.name}&quot; 클라언트</div>
          <p>ID: <code>{v.id}</code></p>
          {(v.redirectUris ?? []).map((v2: any, i2: number) => (
            <p key={i2}>RedirectUris #{i2}: <code>{v2.uri}</code></p>
          ))}
          <p>
            Scopes: {(v.scopes ?? []).map((v2: any, i2: number) => <code key={i2}>{scopeEnum[v2.type]}</code>)}
          </p>
        </div>
      ))}
    </div>
  )
}

export default Client
