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
import { toast } from 'react-hot-toast'

const IndexPage = (): JSX.Element => {
  const location = useLocation()
  const ref = useRef(null)
  const hash = new URL(location.href ?? 'http://example.com').hash.replace('#', '')
  const [page, setPage] = useState(0)
  const [r, rerender] = useState(0)
  const [disabled, setDisabled] = useState(false)
  const [data, setData] = useState<any>()

  const fetchData = (): void => {
    void fetch(`/api/views/@index?page=${page}`)
      .then(async (res) => await res.json())
      .then((res) => {
        if (data?.recents) {
          if (res.data.recents.length < 1) {
            toast.error('다음 페이지가 없습니다', {
              position: 'bottom-center'
            })
            setDisabled(true)
          }

          res.data.recents = [...data.recents, ...res.data.recents]
        }
        setData(res.data)
      })
  }

  useEffect(() => {
    document.title = '경북소프트웨어고 학생 작품 전시관'
    rerender(1)
    void fetchData()
  }, [])

  useEffect(fetchData, [page])

  return (
    <>
      <div ref={ref}/>
      <MainSlide data={data} />
      <MainPopularityList data={data} />
      <MainSchoolList data={data}/>
      <MainUpdateList data={data} onNext={() => setPage(page + 1)} disabled={disabled} />
      <Footer />
      <Modal showCloseIcon={false} key={`${r}${hash}`} container={ref.current} open={!Number.isNaN(parseInt(hash))} onClose={() => {}}>
        <Item onClose={() => { window.location.hash = 'closed' }} key={hash} id={parseInt(hash)} />
      </Modal>
    </>
  )
}

export default IndexPage

export const Head: HeadFC = () => <title>경북소프트웨어고 학생 작품 전시관</title>
