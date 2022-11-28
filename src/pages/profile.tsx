import { HeadFC } from 'gatsby'
import React from 'react'
import Footer from '../components/commons/footer'
import ProfileHeader from '../components/profile/profile-header'
import ProfileItemList from '../components/profile/profile-itemlist'

const ProfilePage = (): JSX.Element => {
  return (
    <>
      <ProfileHeader />
      <ProfileItemList />
      <Footer />
    </>
  )
}

export default ProfilePage

export const Head: HeadFC = () => <title>프로필 - 경소고 포트폴리오</title>
