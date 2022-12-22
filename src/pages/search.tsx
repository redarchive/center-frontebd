import React, { useEffect, useRef, useState } from 'react'
import { HeadFC } from 'gatsby'
import MainSearchList from '../components/main/search-list'
import { useLocation } from '@reach/router'
import { toast } from 'react-hot-toast'
import { Modal } from 'react-responsive-modal'
import Item from '../components/main/item'

const SearchPage = (): JSX.Element => {
  const location = useLocation()
  const ref = useRef(null)
  const url = new URL(location.href ?? 'http://example.com')
  const hash = url.hash.replace('#', '')
  const [page, setPage] = useState(0)
  const [r, rerender] = useState(0)
  const [disabled, setDisabled] = useState(false)
  const [data, setData] = useState<any>()
  const query = url.searchParams.get('query')

  const fetchData = (): void => {
    void fetch(`/api/views/@search?query=${query ?? ''}&page=${page}`)
      .then(async (res) => await res.json())
      .then((res) => {
        if (data?.result) {
          if (res.data.result.length < 1) {
            toast.error('다음 페이지가 없습니다', {
              position: 'bottom-center'
            })
            setDisabled(true)
          }

          if (res.data.result.length < 10) {
            setDisabled(true)
            return
          }

          res.data.result = [...data.result, ...res.data.result]
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

  useEffect(fetchData, [query])
  return (
    <>
      <div ref={ref}/>
      <MainSearchList data={data} onNext={() => setPage(page + 1)} disabled={disabled} query={query} />
      <Modal showCloseIcon={false} key={`${r}${hash}`} container={ref.current} open={!Number.isNaN(parseInt(hash))} onClose={() => {}}>
        <Item onClose={() => { window.location.hash = 'closed' }} key={hash} id={parseInt(hash)} />
      </Modal>
    </>
  )
}

export default SearchPage

export const Head: HeadFC = () => <title>경북소프트웨어고 학생 작품 전시관</title>
