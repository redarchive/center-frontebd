import React, { useEffect, useRef, useState } from 'react'
import { HeadFC, navigate } from 'gatsby'
import MainPopularityList from '../components/main/popularity-list'
import MainSchoolList from '../components/main/school-list'
import MainUpdateList from '../components/main/update-list'
import Footer from '../components/commons/footer'
import { useLocation } from '@reach/router'
import Modal from 'react-responsive-modal'
import Item from '../components/main/item'

const CategoryPage = (): JSX.Element => {
  const location = useLocation()
  const type = new URL(location.href).searchParams.get('type')
  const ref = useRef(null)
  const hash = new URL(location.href).hash.replace('#', '')
  const [r, rerender] = useState(0)

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

  useEffect(() => {
    rerender(1)
  }, [])

  return (
    <>
      <div ref={ref}/>
      <MainPopularityList />
      <MainSchoolList />
      <MainUpdateList />
      <Footer />
      <Modal showCloseIcon={false} key={`${r}${hash}`} container={ref.current} open={!Number.isNaN(parseInt(hash))} onClose={() => {}}>
        <Item onClose={() => { window.location.hash = '#closed' }} key={hash} id={parseInt(hash)} />
      </Modal>
    </>
  )
}

export default CategoryPage

export const Head: HeadFC = () => <title>카테고리 - 경소고 포트폴리오</title>
