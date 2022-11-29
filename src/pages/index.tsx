import React, { useEffect, useRef } from 'react'
import { HeadFC } from 'gatsby'
import MainSlide from '../components/main/slide'
import MainPopularityList from '../components/main/popularity-list'
import MainSchoolList from '../components/main/school-list'
import MainUpdateList from '../components/main/update-list'
import Footer from '../components/commons/footer'
import { Modal } from 'react-responsive-modal'
import Item from '../components/main/item'
import { useLocation } from '@reach/router'

const IndexPage = (): JSX.Element => {
  const location = useLocation()
  const ref = useRef(null)
  const hash = new URL(location.href).hash.replace('#', '')

  useEffect(() => {
    document.title = '경북소프트웨어고 포트폴리오'
  }, [])

  return (
    <>
      <MainSlide />
      <MainPopularityList />
      <MainSchoolList />
      <MainUpdateList />
      <Footer />
      <div ref={ref}/>
      <Modal container={ref.current} key={hash} open={!Number.isNaN(parseInt(hash))} onClose={() => {}}>
        <Item />
      </Modal>
    </>
  )
}

export default IndexPage

export const Head: HeadFC = () => <title>경북소프트웨어고 포트폴리오</title>
