import React from 'react'
import * as style from './style.module.scss'

interface Props {
  message: string
}

const CriticalMessage = ({ message }: Props): JSX.Element =>
  <article className={style.critical}>
    <pre>{message}</pre>
    <p>자세한 내용은 사이트 관리자에게 문의하세요.</p>
  </article>

export default CriticalMessage
