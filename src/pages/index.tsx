import React, { useEffect, useState } from 'react'
import { HeadFC } from 'gatsby'
import Header from '../components/commons/header'
import MainSlide from '../components/main/slide'
import MainPopularityList from '../components/main/popularity-list'
import MainSchoolList from '../components/main/school-list'
import MainUpdateList from '../components/main/update-list'
import Footer from '../components/commons/footer'
import { useLocalStorage } from 'react-use'
import { Modal } from 'react-responsive-modal'
import Item from '../components/main/item'
import Upload from '../components/main/upload'

const IndexPage = (): JSX.Element => {
  const [mode, setMode] = useLocalStorage('light', false)
  const [modal, setModal] = useState(false)

  useEffect(() => {
    document.title = '경북소프트웨어고 포트폴리오'
  }, [])

  const onView = (): void => {
    setModal(true)
  }

  const onClose = (): void => {
    setModal(false)
  }

  return (
    <main data-theme={mode ? 'dark' : 'light'} className='main'>
      <Header mode={mode ?? false} setMode={setMode} />
      <MainSlide />
      <MainPopularityList />
      <MainSchoolList onView={onView} />
      <MainUpdateList />
      <Footer />
      <Upload />
      {/* <Item /> */}
      <Modal open={modal} onClose={onClose} closeOnEsc closeOnOverlayClick center>
        <Item />
      </Modal>
    </main>
  )
}

export default IndexPage

export const Head: HeadFC = () => <title>경북소프트웨어고 포트폴리오</title>
