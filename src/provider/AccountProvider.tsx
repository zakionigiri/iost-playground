import React, { useState } from 'react'
import IOST from 'iost'
import { getApiUrl } from '../lib/index'
import axios, { AxiosResponse } from 'axios'
import { useDispatch, useSelector } from 'react-redux'

const DialogProvider: React.FC = ({ children }) => {
  const dispatch = useDispatch()
  const disalogState = useSelector()

  return <div>{children}</div>
}

export default DialogProvider
