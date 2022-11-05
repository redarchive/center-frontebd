import React from 'react'
import type { HeadFC } from 'gatsby'
import MainHeader from '../components/main/header'
import MainSlide from '../components/main/slide'
import MainPopularityList from '../components/main/popularity-list'
import MainSchoolList from '../components/main/school-list'
import MainUpdateList from '../components/main/update-list'
import MainFooter from '../components/main/footer'
import MainItem from '../components/main/item'
import { useLocalStorage } from 'react-use'

const IndexPage = (): JSX.Element => {
  const [mode, setMode] = useLocalStorage('light', false)
  const [item, setItem] = useLocalStorage('on', false)

  return (
    <main data-theme={mode ? 'dark' : 'light'} className='main'>
      <MainHeader mode={mode ?? false} setMode={setMode} />
      <MainSlide />
      <MainPopularityList item={item ?? false} setItem={setItem} />
      <MainSchoolList />
      <MainUpdateList />
      <MainFooter />
      <MainItem item={item ?? false} setItem={setItem} />
    </main>
  )
}

export default IndexPage

export const Head: HeadFC = () => <title>Home Page</title>
