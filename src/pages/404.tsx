import * as React from 'react'
import { HeadFC } from 'gatsby'

const NotFoundPage = (): JSX.Element => {
  return (
    <main>
      <h1>페이지를 찾을 수 없어요!</h1>
    </main>
  )
}

export default NotFoundPage

export const Head: HeadFC = () => <title>404! - 경소고 학생 작품 전시관</title>
