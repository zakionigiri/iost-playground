import React, { useState } from 'react'
import { useIntl } from 'provider/IntlProvider'
import { Select, MenuItem } from '@material-ui/core'

type Props = {
  abiStr: string
}

type Abi = {
  language: 'javascript'
  version: '1.0.0'
  abi: IOSTJS.Response.Abi[]
}

const FunctionTab: React.FC<Props> = ({ abiStr }) => {
  const abiObj: Abi = JSON.parse(abiStr || '{"abi": []}')
  const [selectedFn, setSelectedFn] = useState<IOSTJS.Response.Abi>()
  const { formatMessage } = useIntl()

  const handleChange = (
    e: React.ChangeEvent<{
      name?: string | undefined
      value: unknown
    }>
  ) => {
    setSelectedFn(abiObj.abi.find(({ name }) => name === e.target.value))
  }

  return (
    <div>
      <p>{formatMessage('functions')}</p>
      <Select onChange={handleChange}>
        {abiObj.abi.map(({ name }) => {
          return (
            <MenuItem key={name} value={name}>
              {name}
            </MenuItem>
          )
        })}
      </Select>
    </div>
  )
}

export default FunctionTab
