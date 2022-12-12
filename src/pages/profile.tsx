import { useLocation } from '@reach/router'
import { navigate } from 'gatsby'
import React, { useEffect, useRef, useState } from 'react'
import toast from 'react-hot-toast'
import Modal from 'react-responsive-modal'
import Footer from '../components/commons/footer'
import Item from '../components/main/item'
import Upload from '../components/main/upload'
import ProfileHeader from '../components/profile/profile-header'
import ProfileItemList, { ItemListFilter } from '../components/profile/profile-itemlist'

const ProfilePage = (): JSX.Element => {
  const location = useLocation()
  const url = new URL(location.href)
  const hash = url.hash.replace('#', '')
  const userId = url.searchParams.get('id')
  const [loading, setLoading] = useState(false)
  const [user, setUser] = useState()
  const [isMe, setIsMe] = useState(false)
  const [filter, setFilter] = useState<ItemListFilter>(ItemListFilter.ALL)
  const [items, setItems] = useState<any[]>()
  const ref = useRef(null)
  const [r, rerender] = useState(0)

  const fetchData = async (): Promise<void> => {
    if (userId === null) {
      void navigate('/')
      return
    }

    const userRes = await fetch('/api/users/' + userId)
      .then(async (res) => await res.json())

    if (!userRes.success) {
      toast.error('해당 유저를 찾을 수 없습니다.')
      void navigate('/')
      return
    }

    const itemsRes = await fetch('/api/services/@by-userId?id=' + userId)
      .then(async (res) => await res.json())

    if (!itemsRes.success) {
      toast.error('해당 유저를 찾을 수 없습니다.')
      void navigate('/')
      return
    }

    document.title = String(userRes.data.user.nickname || userRes.data.user.login) + '님의 정보 - 경소고 포트폴리오'

    setUser(userRes.data.user)
    setIsMe(userRes.data.me)
    setItems(itemsRes.data.services)
  }

  const onSubmit = async (data: any): Promise<void> => {
    setLoading(true)

    const submitRes = await fetch('/api/services', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    }).then(async (res) => await res.json())

    if (!submitRes.success) {
      toast.error('처리중 에러가 발생하였습니다.')
      setLoading(false)
      return
    }

    void navigate('#')
    setLoading(false)
    void fetchData()
  }

  useEffect(() => {
    document.title = '유저 정보 - 경소고 포트폴리오'
    void fetchData()
  }, [userId])

  useEffect(() => {
    rerender(1)
  }, [])

  return (
    <>
      <div ref={ref}/>
      <ProfileHeader isMe={isMe} user={user} />
      <ProfileItemList isMe={isMe} items={items} filter={filter} onFilterChange={(filter) => setFilter(filter)} />
      <Footer />

      <Modal showCloseIcon={false} container={ref.current} key={hash} open={hash === 'new'} onClose={() => {}}>
        <Upload loading={loading} onSubmit={onSubmit} />
      </Modal>
      <Modal showCloseIcon={false} container={ref.current} key={`${r}${hash}`} open={!Number.isNaN(parseInt(hash))} onClose={() => {}}>
        <Item id={parseInt(hash)} onClose={() => { window.location.href = 'closed' }} />
      </Modal>
    </>
  )
}

export default ProfilePage
