import React, { useEffect, useState } from 'react'
import * as style from './style.module.scss'

export enum LoginSelectableTypes {
  CURRENT_STUDENT, // 재학생
  GRADUATED_STUDENT, // 졸업생
  TEACHER // 교사
}

interface Props {
  onSelect: (type: LoginSelectableTypes) => any
  disabled: boolean
}

const LoginTypeSelector = ({ onSelect, disabled }: Props): JSX.Element => {
  const [selectedType, setSelectedType] = useState<LoginSelectableTypes>(LoginSelectableTypes.CURRENT_STUDENT)

  useEffect(() => {
    onSelect(selectedType)
  }, [selectedType])

  return (
    <ul className={style.selector}>
      <li>
        <input
          disabled={disabled}
          name="loginTypeSelector" type="radio" id="loginTypeSelector-current"
          checked={selectedType === LoginSelectableTypes.CURRENT_STUDENT}
          onChange={() => setSelectedType(LoginSelectableTypes.CURRENT_STUDENT)} />

        <label htmlFor="loginTypeSelector-current">재학생</label>
      </li>
      <li>
        <input
          disabled={disabled}
          name="loginTypeSelector" type="radio" id="loginTypeSelector-graduated"
          checked={selectedType === LoginSelectableTypes.GRADUATED_STUDENT}
          onChange={() => setSelectedType(LoginSelectableTypes.GRADUATED_STUDENT)} />

        <label htmlFor="loginTypeSelector-graduated">졸업생</label>
      </li>
      <li>
        <input
          disabled={disabled}
          name="loginTypeSelector" type="radio" id="loginTypeSelector-teacher"
          checked={selectedType === LoginSelectableTypes.TEACHER}
          onChange={() => setSelectedType(LoginSelectableTypes.TEACHER)} />

        <label htmlFor="loginTypeSelector-teacher">교사</label>
      </li>
    </ul>
  )
}

export default LoginTypeSelector
