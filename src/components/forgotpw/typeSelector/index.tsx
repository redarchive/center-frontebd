import React, { useEffect, useState } from 'react'
import * as style from './style.module.scss'

export enum ForgotPWSelectableTypes {
  CURRENT_STUDENT, // 재학생
  GRADUATED_STUDENT, // 졸업생
  TEACHER // 교사
}

interface Props {
  onSelect: (type: ForgotPWSelectableTypes) => any
  disabled: boolean
}

const ForgotPWTypeSelector = ({ onSelect, disabled }: Props): JSX.Element => {
  const [selectedType, setSelectedType] = useState<ForgotPWSelectableTypes>(ForgotPWSelectableTypes.CURRENT_STUDENT)

  useEffect(() => {
    onSelect(selectedType)
  }, [selectedType])

  return (
    <ul className={style.selector}>
      <li>
        <input
          disabled={disabled}
          name="forgotPWTypeSelector" type="radio" id="forgotPWTypeSelector-current"
          checked={selectedType === ForgotPWSelectableTypes.CURRENT_STUDENT}
          onChange={() => setSelectedType(ForgotPWSelectableTypes.CURRENT_STUDENT)} />

        <label htmlFor="forgotPWTypeSelector-current">재학생</label>
      </li>
      <li>
        <input
          disabled={disabled}
          name="forgotPWTypeSelector" type="radio" id="forgotPWTypeSelector-graduated"
          checked={selectedType === ForgotPWSelectableTypes.GRADUATED_STUDENT}
          onChange={() => setSelectedType(ForgotPWSelectableTypes.GRADUATED_STUDENT)} />

        <label htmlFor="forgotPWTypeSelector-graduated">졸업생</label>
      </li>
      <li>
        <input
          disabled={disabled}
          name="forgotPWTypeSelector" type="radio" id="forgotPWTypeSelector-teacher"
          checked={selectedType === ForgotPWSelectableTypes.TEACHER}
          onChange={() => setSelectedType(ForgotPWSelectableTypes.TEACHER)} />

        <label htmlFor="forgotPWTypeSelector-teacher">교사</label>
      </li>
    </ul>
  )
}

export default ForgotPWTypeSelector
