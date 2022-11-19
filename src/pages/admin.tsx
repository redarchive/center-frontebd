import { HeadFC } from 'gatsby'
import React from 'react'
import AdminDownload from '../components/admin/download'
import AdminExitButton from '../components/admin/exitButton'
import AdminExplanation from '../components/admin/explanation'
import AdminUpload from '../components/admin/upload'
import Container from '../components/commons/container'
import FadeIn from '../components/commons/fadeIn'

const AdminPage = (): JSX.Element => {
  return (
    <main>
      <Container size="sm">
        <FadeIn>
          <AdminExitButton />
          <AdminDownload />
          <AdminExplanation />
          <AdminUpload />
        </FadeIn>
      </Container>
    </main>
  )
}

export default AdminPage

export const Head: HeadFC = () =>
  <title>GBSW Center - 관리자페이지</title>
