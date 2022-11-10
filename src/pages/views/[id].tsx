import React from 'react'
import type { HeadFC } from 'gatsby'
import MainHeader from '../../components/main/header'
import MainSlide from '../../components/main/slide'
import MainPopularityList from '../../components/main/popularity-list'
import MainSchoolList from '../../components/main/school-list'
import MainUpdateList from '../../components/main/update-list'
import MainFooter from '../../components/main/footer'
import MainItem from '../../components/main/item'
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
      <MainFooter />
      <MainItem />
    </main>
  )
}

export default IndexPage

export const Head: HeadFC = () => <title>Home Page</title>
