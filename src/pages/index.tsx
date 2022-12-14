import React, { useEffect, useRef, useState } from 'react'
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
  const [r, rerender] = useState(0)
  const [data, setData] = useState<any>()

  useEffect(() => {
    document.title = '경북소프트웨어고 학생 작품 전시관'
    rerender(1)

    void fetch('/api/views/@index')
      .then(async (res) => await res.json())
      .then((res) => { setData(res.data) })
  }, [])

  return (
    <>
      <div ref={ref}/>
      <MainSlide data={data} />
      <MainPopularityList />
      <MainSchoolList />
      <MainUpdateList />
      <Footer />
      <Modal showCloseIcon={false} key={`${r}${hash}`} container={ref.current} open={!Number.isNaN(parseInt(hash))} onClose={() => {}}>
        <Item onClose={() => { window.location.hash = 'closed' }} key={hash} id={parseInt(hash)} />
      </Modal>
    </>
  )
}

export default IndexPage

export const Head: HeadFC = () => <title>경북소프트웨어고 학생 작품 전시관</title>
