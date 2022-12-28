import { navigate } from 'gatsby'
import React, { FormEvent } from 'react'
import { toast } from 'react-hot-toast'
import * as style from './style.module.scss'
import { FaPlus, FaExclamationTriangle } from 'react-icons/fa'

interface Props {
  id: number
}

const Delete = ({ id }: Props): JSX.Element => {
  const onDelete = (e: FormEvent): void => {
    e.preventDefault()

    void fetch(`/api/services/${id}`, {
      method: 'DELETE'
    }).then(async (res) => await res.json())
      .then((res) => {
        if (res.success) {
          toast.success('삭제하였습니다')
        } else {
          toast.error('삭제중 오류가 발생했습니다')
        }

        void navigate('/')
      })
  }

  return (
    <>
      <a href='#closed' className={style.item__back}></a>
      <div className={style.item__container}>
        <form onSubmit={onDelete}>
          <p><FaExclamationTriangle/>#{id} 게시글을 삭제할까요?</p>
          <button className={style.del}>삭제</button>
          <button type="button" onClick={() => { window.location.hash = `${id}` }}>취소</button>
        </form>
        <a href="#" className={style.clear}><FaPlus/></a>
      </div>
    </>
  )
}

export default Delete
