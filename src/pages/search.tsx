import React, { useEffect, useRef, useState } from 'react'
import { HeadFC } from 'gatsby'
import MainItemList from '../components/main/item-list'
import Footer from '../components/commons/footer'
import { useLocation } from '@reach/router'
import { toast } from 'react-hot-toast'

const SearchPage = (): JSX.Element => {
  const location = useLocation()
  const ref = useRef(null)
  const url = new URL(location.href ?? 'http://example.com')
  const [page, setPage] = useState(0)
  const [r, rerender] = useState(0)
  const [disabled, setDisabled] = useState(false)
  const [data, setData] = useState<any>()
  const query = url.searchParams.get('query')

  const fetchData = (): void => {
    void fetch(`/api/search/?search=${query ?? ''}&page=${page}`)
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
      <MainItemList data={data} />
      <Footer />
    </>
  )
}

export default SearchPage

export const Head: HeadFC = () => <title>경북소프트웨어고 학생 작품 전시관</title>
