import React, { useEffect } from 'react'
import { HeadFC, navigate } from 'gatsby'
import MainSlide from '../components/main/slide'
import MainPopularityList from '../components/main/popularity-list'
import MainSchoolList from '../components/main/school-list'
import MainUpdateList from '../components/main/update-list'
import Footer from '../components/commons/footer'
import { useLocation } from '@reach/router'

const CategoryPage = (): JSX.Element => {
  const location = useLocation()
  const type = new URL(location.href).searchParams.get('type')

  useEffect(() => {
    if (type === null) {
      void navigate('/')
      return
    }

    const typeLabel: { [key: string]: string } = {
      WEBSITE: '웹',
      DESKTOP: '데스크톱',
      MOBILE: '앱',
      GAME: '게임',
      PHYSICAL: 'IOT'
    }

    document.title = `${typeLabel[type]} - 경소고 포트폴리오`
  }, [type])

  return (
    <>
      <MainSlide />
      <MainPopularityList />
      <MainSchoolList />
      <MainUpdateList />
      <Footer />
    </>
  )
}

export default CategoryPage

export const Head: HeadFC = () => <title>카테고리 - 경소고 포트폴리오</title>
