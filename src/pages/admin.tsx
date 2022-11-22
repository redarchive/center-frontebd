import { HeadFC } from 'gatsby'
import React, { useState } from 'react'
import toast from 'react-hot-toast'
import AdminDownload from '../components/admin/download'
import AdminExitButton from '../components/admin/exitButton'
import AdminExplanation from '../components/admin/explanation'
import AdminSummary from '../components/admin/summary'
import AdminUpload from '../components/admin/upload'
import Container from '../components/commons/container'
import FadeIn from '../components/commons/fadeIn'

const AdminPage = (): JSX.Element => {
  const [isLoading, setIsLoading] = useState(false)
  const [isWarned, setIsWarned] = useState(false)
  const [diff, setDiff] = useState<any>(null)

  const onUpload = async (data: string): Promise<void> => {
    if (isLoading) return
    setIsLoading(true)

    const diffres = await fetch('/api/persons/@diff', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        data
      })
    }).then(async (res) => await res.json())

    if (!diffres.success) {
      toast.error(diffres.message)
      setIsLoading(false)
      return
    }

    setDiff(diffres.data.diff)
    setIsLoading(false)
  }

  const onConfirm = async (): Promise<void> => {
    if (isLoading) return
    setIsLoading(true)

    if (!isWarned) {
      const confirmMessage =
        '===== 주의! =====\n\n' +
        '"데이터 손상시 복구가 불가능합니다!"\n\n' +
        '같은 ID가 여러번 입력됬을 경우 예기치 못한 동작이 발생 할 수 있습니다.\n' +
        '다시 한번 삭제되는 건수를 "꼭" 확인하세요\n' +
        '가능한 사용자를 삭제하지 마시고 학생일 경우 졸업자로 옮기세요.\n\n' +
        '다시 "적용"버튼을 눌러 진행합니다.'

      setIsWarned(confirm(confirmMessage))
      setIsLoading(false)
      return
    }

    const applyRes = await fetch('/api/persons/@apply', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        ...diff
      })
    }).then(async (res) => await res.json())

    if (applyRes.success) {
      toast.success('Applyed!')
    } else {
      toast.error(applyRes.message)
    }

    setIsLoading(false)
    setIsWarned(false)
    setDiff(null)
  }

  return (
    <main>
      <Container size="sm">
        <FadeIn>
          <AdminExitButton />

          {diff === null && <>
            <AdminDownload isLoading={isLoading} />
            <AdminExplanation />
            <AdminUpload onUpload={onUpload} isLoading={isLoading} />
          </>}

          {diff !== null && <>
            <AdminSummary isLoading={isLoading} onConfirm={onConfirm} onCancel={() => isLoading || setDiff(null)} diff={diff}/>
          </>}
        </FadeIn>
      </Container>
    </main>
  )
}

export default AdminPage

export const Head: HeadFC = () =>
  <title>GBSW Center - 관리자페이지</title>
