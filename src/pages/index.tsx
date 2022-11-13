import React from 'react'
import { HeadFC, Link } from 'gatsby'
import MainHeader from '../components/main/header'
import MainSlide from '../components/main/slide'
import MainPopularityList from '../components/main/popularity-list'
import MainSchoolList from '../components/main/school-list'
import MainUpdateList from '../components/main/update-list'
import MainProfile from '../components/main/profile'
import MainFooter from '../components/main/footer'
import { useLocalStorage } from 'react-use'

const IndexPage = (): JSX.Element => {
  const [mode, setMode] = useLocalStorage('light', false)

  return (
    <main data-theme={mode ? 'dark' : 'light'} className='main'>
      <MainHeader mode={mode ?? false} setMode={setMode} />
      <MainSlide />
      <MainPopularityList />
      <MainSchoolList />
      <MainUpdateList />
      <MainProfile />
      <MainFooter />
    </main>
  )
}

export default IndexPage

export const Head: HeadFC = () => <title>Home Page</title>
