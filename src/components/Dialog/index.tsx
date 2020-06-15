import React from 'react'
import { useSelector } from 'react-redux'
import { selectDialogs } from 'store/features/view/selectors'

const Dialog = () => {
  const { isOpen, Component } = useSelector(selectDialogs)

  return <div>{isOpen === true && Component !== null && <Component />}</div>
}

export default Dialog
