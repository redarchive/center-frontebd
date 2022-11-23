import { HeadFC } from 'gatsby'
import React from 'react'
import { useLocalStorage } from 'react-use'
import Footer from '../components/commons/footer'
import Header from '../components/commons/header'
import ProfileHeader from '../components/profile/profile-header'
import ProfileItemList from '../components/profile/profile-itemlist'

const ProfilePage = (): JSX.Element => {
  const [mode, setMode] = useLocalStorage('light', false)

  return (
    <main data-theme={mode ? 'dark' : 'light'} className='main'>
      <Header mode={mode ?? false} setMode={setMode} />
      <ProfileHeader />
      <ProfileItemList />
      <Footer />
    </main>
  )
}

export default ProfilePage

export const Head: HeadFC = () => <title>프로필 - 경소고 포트폴리오</title>
