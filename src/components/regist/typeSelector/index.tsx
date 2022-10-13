import React, { useEffect, useState } from 'react'
import * as style from './style.module.scss'
import ReactTooltop from 'react-tooltip'

export enum RegistSelectableTypes {
  CURRENT_STUDENT = 0, // 재학생
  TEACHER = 2 // 교사
}

interface Props {
  disabled: boolean
  onSelect: (type: RegistSelectableTypes) => any
}

const RegistTypeSelector = ({ onSelect, disabled }: Props): JSX.Element => {
  const [selectedType, setSelectedType] = useState<RegistSelectableTypes>(RegistSelectableTypes.CURRENT_STUDENT)

  useEffect(() => {
    onSelect(selectedType)
  }, [selectedType])

  return (
    <ul className={style.selector}>
       <li>
        <input
          disabled={disabled}
          name="registTypeSelector" type="radio" id="registTypeSelector-current"
          checked={selectedType === RegistSelectableTypes.CURRENT_STUDENT}
          onChange={() => setSelectedType(RegistSelectableTypes.CURRENT_STUDENT)} />

        <label htmlFor="registTypeSelector-current">재학생</label>
      </li>
      <li>
        <input disabled id="registTypeSelector-graduated"/>
        <label data-tip="졸업생은 회원가입이 불가능해요ㅠㅠ" htmlFor="registTypeSelector-graduated">졸업생</label>
        <ReactTooltop place="bottom" />
      </li>
      <li>
        <input
          disabled={disabled}
          name="registTypeSelector" type="radio" id="registTypeSelector-teacher"
          checked={selectedType === RegistSelectableTypes.TEACHER}
          onChange={() => setSelectedType(RegistSelectableTypes.TEACHER)} />

        <label htmlFor="registTypeSelector-teacher">교사</label>
      </li>
    </ul>
  )
}

export default RegistTypeSelector
