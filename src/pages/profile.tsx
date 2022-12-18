import { useLocation } from '@reach/router'
import { HeadFC, navigate } from 'gatsby'
import React, { useEffect, useRef, useState } from 'react'
import toast from 'react-hot-toast'
import Modal from 'react-responsive-modal'
import Footer from '../components/commons/footer'
import Delete from '../components/main/delete'
import Item from '../components/main/item'
import Upload from '../components/main/upload'
import ProfileHeader from '../components/profile/profile-header'
import ProfileItemList, { ItemListFilter } from '../components/profile/profile-itemlist'

const ProfilePage = (): JSX.Element => {
  const location = useLocation()
  const url = new URL(location.href ?? 'http://example.com')
  const hash = url.hash.replace('#', '')
  const userId = url.searchParams.get('id')
  const [loading, setLoading] = useState(false)
  const [user, setUser] = useState()
  const [isMe, setIsMe] = useState(false)
  const [filter, setFilter] = useState<ItemListFilter>(ItemListFilter.ALL)
  const [items, setItems] = useState<any[]>()
  const ref = useRef(null)
  const [editData, setEditData] = useState<any>()
  const [r, rerender] = useState(0)

  const categoryEnum = ['WEBSITE', 'MOBILE', 'GAME', 'DESKTOP', 'PHYSICAL']

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

    if (hash.startsWith('edit-')) {
      const editRes = await fetch('/api/services/' + hash.replace('edit-', ''))
        .then(async (res) => await res.json())

      if (!editRes.success) {
        toast.error('해당 항목을 찾을 수 없습니다.')
        void navigate('/')
        return
      }

      editRes.data.service.screenshots = editRes.data.service.screenshots.map((v: any) => v.url)
      editRes.data.service.tags = editRes.data.service.tags.map((v: any) => v.label)

      delete editRes.data.service.id
      delete editRes.data.service.logins
      delete editRes.data.service.stats
      delete editRes.data.service.userId
      delete editRes.data.service.createdAt

      setEditData(editRes.data.service)
    }

    document.title = String(userRes.data.user.nickname || userRes.data.user.login) + '님의 정보 - 경소고 학생 작품 전시관'

    setUser(userRes.data.user)
    setIsMe(userRes.data.me)
    setItems(itemsRes.data.services)
  }

  const onSubmit = async (data: any): Promise<void> => {
    setLoading(true)

    if (hash.startsWith('edit-')) {
      if (typeof data.type !== 'string') {
        data.type = categoryEnum[data.type]
      }
    }

    const submitRes = await fetch('/api/services' + (hash.startsWith('edit-') ? '/' + hash.replace('edit-', '') : ''), {
      method: hash.startsWith('edit-') ? 'PATCH' : 'POST',
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

    window.location.hash = hash.startsWith('edit-') ? hash.replace('edit-', '') : '#closed'

    setLoading(false)
    void fetchData()
  }

  useEffect(() => {
    void fetchData()
  }, [userId])

  useEffect(() => {
    void fetchData()
  }, [hash])

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
        <Upload loading={loading} onSubmit={onSubmit}/>
      </Modal>
      <Modal showCloseIcon={false} container={ref.current} key={`e${hash}`} open={hash.startsWith('edit-')} onClose={() => {}}>
        {editData && <Upload loading={loading} onSubmit={onSubmit} editData={editData}/>}
      </Modal>
      <Modal showCloseIcon={false} container={ref.current} key={`d${hash}`} open={hash.startsWith('delete-')} onClose={() => {}}>
        <Delete id={parseInt(hash.replace('delete-', ''))} />
      </Modal>
      <Modal showCloseIcon={false} container={ref.current} key={`${r}${hash}`} open={!Number.isNaN(parseInt(hash))} onClose={() => {}}>
        <Item id={parseInt(hash)} onClose={() => { window.location.hash = 'closed' }} />
      </Modal>
    </>
  )
}

export default ProfilePage

export const Head: HeadFC = () => <title>유저정보 - 경소고 학생 작품 전시관</title>
