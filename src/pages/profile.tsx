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
  const [user, setUser] = useState()
  const [isMe, setIsMe] = useState(false)
  const [filter, setFilter] = useState<ItemListFilter>(ItemListFilter.ALL)
  const [items, setItems] = useState<any[]>()
  const ref = useRef(null)

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
    }

    const itemsRes = await fetch('/api/services/@by-userId?id=' + userId)
      .then(async (res) => await res.json())

    if (!itemsRes.success) {
      toast.error('해당 유저를 찾을 수 없습니다.')
      void navigate('/')
    }

    document.title = String(userRes.data.user.nickname || userRes.data.user.login) + '님의 정보 - 경소고 포트폴리오'

    setUser(userRes.data.user)
    setIsMe(userRes.data.me)
    setItems(itemsRes.data.services)
  }

  useEffect(() => {
    document.title = '유저 정보 - 경소고 포트폴리오'
    void fetchData()
  }, [userId])

  console.log(hash)

  return (
    <>
      <ProfileHeader isMe={isMe} user={user} />
      <ProfileItemList isMe={isMe} items={items} filter={filter} onFilterChange={(filter) => setFilter(filter)} />
      <Footer />

      <div ref={ref}/>
      <Modal container={ref.current} key={hash} open={hash === 'new'} onClose={() => {}}>
        <Upload />
      </Modal>
      <Modal container={ref.current} key={hash + '-'} open={!Number.isNaN(parseInt(hash))} onClose={() => {}}>
        <Item />
      </Modal>
    </>
  )
}

export default ProfilePage
