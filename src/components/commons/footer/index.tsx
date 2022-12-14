import React, { useEffect, useState } from 'react'
import * as style from './style.module.scss'
import Logo from './assets/symbol-logo.svg'

const Footer = (): JSX.Element => {
  const [count, setCount] = useState<number>()

  useEffect(() => {
    void fetch('/api/views/@status')
      .then(async (res) => await res.json())
      .then((res) => { setCount(res.data.count) })
  }, [])

  return (
    <div className={style.footer}>
      <div className={style.left}>
        <div>우[37362] 경상북도 의성군 봉양면 봉호로 14 경북소프트웨어고등학교 Copyright &copy; 경북소프트웨어고등학교. All Rights Reserved.</div>
        <div>Tel. 교무실: 054-832-2903, 행정실: 054-832-2900 FAX. 054-833-2877</div>
      </div>
      <div className={style.right}>
        <div><span>{count ?? '...'}</span>개의 작품이 등록되어 있습니다. <img src={Logo} alt="logo" /></div>
        <div>학교 홈페이지로 이동 : <a href="http://school.gyo6.net/gbsw">http://school.gyo6.net/gbsw</a></div>
      </div>
    </div>
  )
}

export default Footer
