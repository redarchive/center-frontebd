import React from 'react'
import { Toaster } from 'react-hot-toast'
import './src/style.global.scss'

export const wrapPageElement = ({ element, props }) => {
  return (
    <>
      <Toaster />
      {element}
    </>
  )
}
