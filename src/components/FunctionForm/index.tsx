import React from 'react'
import { Abi } from 'store/features/contract/types'
import { Select, MenuItem, Input, InputLabel, Button } from '@material-ui/core'
import useStyles from './styles'
import {
  selectFunction,
  setFunctionArgs,
  sendFunctionFormStart
} from 'store/features/form/slices'
import {
  selectedFunctionSelector,
  argsSelector
} from 'store/features/form/selectors'
import { useDispatch, useSelector } from 'react-redux'

type Props = {
  abi: Abi['abi']
}

const FunctionForm: React.FC<Props> = ({ abi }) => {
  const classes = useStyles()
  const selectedFunction = useSelector(selectedFunctionSelector)
  const currentArgs = useSelector(argsSelector)
  const dispatch = useDispatch()

  const handleSelectChange = (
    e: React.ChangeEvent<{
      name?: string | undefined
      value: unknown
    }>
  ) => {
    const { value } = e.target
    if (typeof value === 'string') {
      dispatch(selectFunction(value))
    }
  }

  const handleInputChange = (index: number) => (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    dispatch(
      setFunctionArgs({
        index,
        arg: e.target.value
      })
    )
  }

  const handleSubmit = () => {
    dispatch(sendFunctionFormStart())
  }

  return (
    <div className={classes.container}>
      <h4>Functions</h4>
      <Select value={selectedFunction} onChange={handleSelectChange}>
        {abi.map(({ name, args }, index) => (
          <MenuItem value={name} key={`function_${index}`}>
            {name}
          </MenuItem>
        ))}
      </Select>
      <div>
        {abi.map(
          ({ args, name }, index) =>
            selectedFunction === name &&
            currentArgs &&
            args.map((type, index) => (
              <div key={`arg_${index}`}>
                <Input
                  defaultValue={currentArgs[index]}
                  onChange={handleInputChange(index)}
                />
                <InputLabel>Type: {args[index]}</InputLabel>
              </div>
            ))
        )}
      </div>
      <Button onClick={handleSubmit}>Send Transaction</Button>
    </div>
  )
}

export default FunctionForm
