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
import useLocale from 'hooks/useLocale'

type Props = {
  abi: Abi['abi']
}

const FunctionForm: React.FC<Props> = ({ abi }) => {
  const classes = useStyles()
  const { selectedContract, selectedFunction, args: currentArgs } = useSelector(
    argsSelector
  )
  const dispatch = useDispatch()
  const { formatMessage } = useLocale()

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
    dispatch(
      sendFunctionFormStart({
        contractId: selectedContract,
        functionName: selectedFunction,
        args: currentArgs
      })
    )
  }

  return (
    <div className={classes.container}>
      <h4>{formatMessage('functions')}</h4>
      <div className={classes.formContainer}>
        <Select
          color="secondary"
          variant="outlined"
          value={selectedFunction}
          onChange={handleSelectChange}
          className={classes.select}
        >
          {abi.map(({ name }, index) => (
            <MenuItem value={name} key={`function_${index}`}>
              {name}
            </MenuItem>
          ))}
        </Select>
        {abi.map(
          ({ args, name }, _index) =>
            selectedFunction === name &&
            currentArgs &&
            args.map((type, index) => (
              <div key={`arg_${index}`} className={classes.inputContainer}>
                <Input
                  color="secondary"
                  className={classes.input}
                  defaultValue={currentArgs[index]}
                  onChange={handleInputChange(index)}
                />
                <InputLabel className={classes.inputLabel}>
                  {formatMessage('data-type')}: {args[index]}
                </InputLabel>
              </div>
            ))
        )}
      </div>
      <Button
        onClick={handleSubmit}
        className={classes.sendTxButton}
        color="secondary"
        variant="outlined"
      >
        {formatMessage('send-tx-button')}
      </Button>
    </div>
  )
}

export default FunctionForm
