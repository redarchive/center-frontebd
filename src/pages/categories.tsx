import React, { useEffect, useRef, useState } from 'react'
import { HeadFC, navigate } from 'gatsby'
import MainPopularityList from '../components/main/popularity-list'
import MainSchoolList from '../components/main/school-list'
import MainUpdateList from '../components/main/update-list'
import Footer from '../components/commons/footer'
import { useLocation } from '@reach/router'
import Modal from 'react-responsive-modal'
import Item from '../components/main/item'
import { toast } from 'react-hot-toast'

const CategoryPage = (): JSX.Element => {
  const location = useLocation()
  const type = new URL(location.href ?? 'http://example.com').searchParams.get('type')
  const [disabled, setDisabled] = useState(false)
  const ref = useRef(null)
  const hash = new URL(location.href ?? 'http://example.com').hash.replace('#', '')
  const [r, rerender] = useState(0)
  const [page, setPage] = useState(0)
  const [data, setData] = useState<any>()

  useEffect(() => {
    if (type === null) {
      void navigate('/')
      return
    }

    const typeLabel: { [key: string]: string } = {
      WEBSITE: '웹사이트',
      DESKTOP: '데스크톱',
      MOBILE: '어플',
      GAME: '게임',
      PHYSICAL: 'IOT'
    }

    document.title = `${typeLabel[type]} - 경소고 학생 작품 전시관`
    void fetchData(true)
  }, [type])

  useEffect(() => {
    rerender(1)
    void fetchData()
  }, [])

  useEffect(() => {
    void fetchData()
  }, [page])

  const fetchData = (typeChanged = false): void => {
    void fetch(`/api/views/@category?page=${typeChanged ? 0 : page}&type=${type ?? ''}`)
      .then(async (res) => await res.json())
      .then((res) => {
        if (typeChanged) {
          setPage(0)

          if (data) {
            data.recents = []
          }
        }

        if (!typeChanged && res.data.recents.length < 1) {
          toast.error('더 이상 불러올 서비스가 없습니다', {
            position: 'bottom-center'
          })
          setDisabled(true)
          return
        }

        res.data.recents = [...data?.recents || [], ...res.data.recents]
        setData(res.data)
      })
  }

  return (
    <>
      <div ref={ref}/>
      <MainPopularityList data={data} />
      <MainSchoolList data={data} />
      <MainUpdateList data={data} onNext={() => setPage(page + 1)} disabled={disabled} />
      <Footer />
      <Modal showCloseIcon={false} key={`${r}${hash}`} container={ref.current} open={!Number.isNaN(parseInt(hash))} onClose={() => {}}>
        <Item onClose={() => { window.location.hash = '#closed' }} key={hash} id={parseInt(hash)} />
      </Modal>
    </>
  )
}

export default CategoryPage

export const Head: HeadFC = () => <title>카테고리 - 경소고 학생 작품 전시관</title>
