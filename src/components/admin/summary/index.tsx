import React from 'react'
import { HashLoader } from 'react-spinners'
import * as style from './style.module.scss'

interface Props {
  diff: any
  onConfirm: () => any
  onCancel: () => any
  isLoading: boolean
}

const AdminSummary = ({ diff, onCancel, onConfirm, isLoading }: Props): JSX.Element => {
  return (
    <div className={style.summary}>
      <h2>예상 업데이트 내용</h2>
      <ul>
        <li>재학생 생성: {diff.newStudent.length}건</li>
        <li>졸업생 생성: {diff.newGraduated.length}건</li>
        <li>교사 생성: {diff.newTeacher.length}건</li>

        <li>재학생 -&gt; 졸업생: {diff.studentToGraduated.length}건</li>
        <li>재학생 -&gt; 교사: {diff.studentToTeacher.length}건</li>

        <li>졸업생 -&gt; 재학생: {diff.graduatedToStudent.length}건</li>
        <li>졸업생 -&gt; 교사: {diff.graduatedToTeacher.length}건</li>

        <li>교사 -&gt; 재학생: {diff.teacherToStudent.length}건</li>
        <li>교사 -&gt; 졸업생: {diff.teacherToGraduated.length}건</li>

        <li>재학생 정보 수정: {diff.willModifyStudent.length}건</li>
        <li>졸업생 정보 수정: {diff.willModifyGraduated.length}건</li>
        <li>교사 정보 수정: {diff.willModifyTeacher.length}건</li>

        <li>삭제: {diff.willDelete.length}건</li>
      </ul>

      <div className={style.right}>
        <button className={isLoading && style.loading} onClick={onConfirm}>
          {!isLoading && '적용'}
          {isLoading && (
            <>
              <HashLoader size={20} />
              적용 중...
            </>
          )}
        </button>
        <button className={style.secondary} onClick={onCancel}>취소</button>
      </div>
    </div>
  )
}

export default AdminSummary
