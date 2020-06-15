import React, { useState, useEffect } from 'react'
import useLocale from '../../hooks/useLocale'
import { Select, MenuItem, Input } from '@material-ui/core'
import useStyles from './styles'

type Props = {
  abiStr: string
}

type Abi = {
  language: 'javascript'
  version: '1.0.0'
  abi: IOST.Response.Abi[]
}

type ArgPrimitives = string | number | boolean

const FunctionTab: React.FC<Props> = ({ abiStr }) => {
  const abiObj: Abi = JSON.parse(abiStr || '{"abi": []}')
  const [selectedFn, setSelectedFn] = useState<IOST.Response.Abi>()
  const [args, setArgs] = useState<ArgPrimitives[]>([])
  const { formatMessage } = useLocale()
  const classes = useStyles()

  useEffect(() => {
    selectedFn && setArgs(new Array(selectedFn.args.length))
  }, [selectedFn])

  const handleSelectChange = (
    e: React.ChangeEvent<{
      name?: string | undefined
      value: unknown
    }>
  ) => {
    setSelectedFn(abiObj.abi.find(({ name }) => name === e.target.value))
  }

  const handleArgChange = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    const index = +e.target.name
    const newArgs = [...args]
    newArgs[index] = e.target.value
    setArgs(newArgs)
  }

  return (
    <div>
      <p>{formatMessage('functions')}</p>
      <Select className={classes.functionSelect} onChange={handleSelectChange}>
        {abiObj.abi.map(({ name }) => {
          return (
            <MenuItem key={name} value={name}>
              {name}
            </MenuItem>
          )
        })}
      </Select>
      {selectedFn && (
        <div>
          <h4>Function name: {selectedFn.name}</h4>
          <p>{selectedFn.description || ''}</p>
          <div>
            <ul>
              {selectedFn.args.map((arg, index) => {
                return (
                  <li key={index}>
                    Type: [{arg}]
                    <Input
                      className={classes.argInput}
                      value={args[index]}
                      key={index}
                      name={'' + index}
                      onChange={handleArgChange}
                    />
                  </li>
                )
              })}
            </ul>
            {JSON.stringify(args)}
          </div>
        </div>
      )}
    </div>
  )
}

export default FunctionTab
