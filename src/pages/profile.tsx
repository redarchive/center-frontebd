import { useLocation } from '@reach/router'
import { HeadFC } from 'gatsby'
import React from 'react'
import Modal from 'react-responsive-modal'
import Footer from '../components/commons/footer'
import Upload from '../components/main/upload'
import ProfileHeader from '../components/profile/profile-header'
import ProfileItemList from '../components/profile/profile-itemlist'

const ProfilePage = (): JSX.Element => {
  const location = useLocation()
  const hash = new URL(location.href).hash.replace('#', '')

  return (
    <>
      <ProfileHeader />
      <ProfileItemList />
      <Footer />
      <Modal key={hash} open={hash === 'new'} onClose={() => {}}>
        <Upload />
      </Modal>
    </>
  )
}

export default ProfilePage

export const Head: HeadFC = () => <title>프로필 - 경소고 포트폴리오</title>
