import { useLocation } from '@reach/router'
import { HeadFC, navigate } from 'gatsby'
import React, { useEffect, useRef, useState } from 'react'
import toast from 'react-hot-toast'
import Modal from 'react-responsive-modal'
import Delete from '../components/main/delete'
import Item from '../components/main/item'
import Upload from '../components/main/upload'
import EditProf, { UpdateUserDto } from '../components/main/editprof'
import ProfileHeader from '../components/profile/profile-header'
import ProfileItemList, { ItemListFilter } from '../components/profile/profile-itemlist'

const ProfilePage = (): JSX.Element => {
  const location = useLocation()
  const url = new URL(location.href ?? 'http://example.com')
  const hash = url.hash.replace('#', '')
  const userId = url.searchParams.get('id')
  const [loading, setLoading] = useState(false)
  const [user, setUser] = useState<any>()
  const [isMe, setIsMe] = useState(false)
  const [filter, setFilter] = useState<ItemListFilter>(ItemListFilter.ALL)
  const [items, setItems] = useState<any[]>()
  const ref = useRef(null)
  const [editData, setEditData] = useState<any>()
  const [r, rerender] = useState(0)

  const categoryEnum = ['WEBSITE', 'MOBILE', 'GAME', 'DESKTOP', 'PHYSICAL']
  const scopeEnum = ['REAL_NAME', 'EMAIL', 'PHONE_NUMBER', 'GENDER', 'CLASS_INFO', 'DORMITORY']

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
      setEditData(undefined)

      const editRes = await fetch('/api/services/' + hash.replace('edit-', ''))
        .then(async (res) => await res.json())

      if (!editRes.success) {
        toast.error('해당 항목을 찾을 수 없습니다.')
        void navigate('/')
        return
      }

      editRes.data.service.screenshots = editRes.data.service.screenshots.map((v: any) => v.url)
      editRes.data.service.tags = editRes.data.service.tags.map((v: any) => v.label)
      editRes.data.service.clients = editRes.data.service.clients.map((v: any) => ({
        ...v,
        redirectUris: v.redirectUris.map((v2: any) => v2.uri),
        scopes: v.scopes.filter((v2: any) => v2.type !== 0).map((v2: any) => ({ ...v2, type: scopeEnum[v2.type - 1] }))
      }))

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

    data.clients = data.clients.map((v: any) => ({
      ...v,
      scopes: v.scopes.filter((v2: any) => Number.isNaN(parseInt(v2.type)))
    }))

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

  const onEditSubmit = async (data: any): Promise<void> => {
    setLoading(true)

    const submitRes = await fetch('/api/users/@me', {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    }).then(async (res) => await res.json())

    if (!submitRes.success) {
      toast.error('처리중 에러가 발생하였습니다. 기존 비밀번호를 다시 확인해 주세요.')
      setLoading(false)
      return
    }

    toast.success('프로필이 성공적으로 수정되었습니다.')

    window.location.hash = '#closed'

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

  const userData: UpdateUserDto = {
    id: user?.id ?? -1,
    email: user?.email,
    nickname: user?.nickname,
    profileImage: user?.profileImage
  }

  console.log(userData)

  return (
    <>
      <div ref={ref}/>
      <ProfileHeader isMe={isMe} user={user} />
      <ProfileItemList isMe={isMe} items={items} filter={filter} onFilterChange={(filter) => setFilter(filter)} />

      <Modal showCloseIcon={false} container={ref.current} key={hash} open={hash === 'new'} onClose={() => {}}>
        <Upload loading={loading} onSubmit={onSubmit}/>
      </Modal>
      <Modal showCloseIcon={false} container={ref.current} key={`ep${hash}`} open={hash === 'editprof'} onClose={() => {}}>
        {user && <EditProf loading={loading} onSubmit={onEditSubmit} userData={userData} />}
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
