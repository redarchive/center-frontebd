import React, { useEffect, useState } from 'react'
import ItemHeader from './item-header'
import ItemSlide from './item-slide'
import ItemTextbox from './item-textbox'
import * as style from './style.module.scss'
import ItemGraph from './item-graph/index'
import { toast } from 'react-hot-toast'

interface Props {
  id: number
  onClose: () => any
}

const Item = ({ id, onClose }: Props): JSX.Element => {
  const [data, setData] = useState<any>()

  const fetchData = async (): Promise<void> => {
    if (Number.isNaN(id)) {
      toast.error('해당 서비스를 찾을 수 없습니다')
      onClose()
      return
    }

    const dataRes = await fetch(`/api/services/${id}`)
      .then(async (res) => await res.json())

    if (!dataRes.success) {
      toast.error('해당 서비스를 찾을 수 없습니다')
      onClose()
      return
    }

    setData(dataRes.data)
  }

  useEffect(() => {
    void fetchData()
  }, [])

  if (data === undefined) return <></>

  return (
    <>
      <a href='#closed' className={style.item__back}></a>
      <div className={style.item__container}>
        <a href='#closed' className={style.clear}>1</a>
        {data !== undefined && (
          <>
            <ItemHeader />
            <ItemSlide />
            <ItemTextbox />
            <ItemGraph />
          </>
        )}
      </div>
    </>
  )
}

export default Item
