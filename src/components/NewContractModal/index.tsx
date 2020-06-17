import React, { useState } from 'react'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import RadioGroup from '@material-ui/core/RadioGroup'
import Radio from '@material-ui/core/Radio'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import useStyles from './styles'
import useLocale from '../../hooks/useLocale'
import { useDispatch } from 'react-redux'
import { closeDialog } from '../../store/features/view/slices'
import {
  createContract,
  importStart
} from '../../store/features/contract/slices'
import RpcHostSelect from '../RpcHostSelect'

const NewContractModal = () => {
  const classes = useStyles()
  const [mode, setMode] = useState('create')
  const [userInput, setUserInput] = useState('')
  const { formatMessage } = useLocale()
  const dispatch = useDispatch()

  const handleRadioChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    value: string
  ) => {
    setMode(value)
  }

  const handleSubmit = () => {
    if (mode === 'create') {
      dispatch(createContract({ fileName: userInput }))
      handleClose()
    }
    dispatch(importStart(userInput))
  }

  const handleClose = () => dispatch(closeDialog())

  const handleInputChange = (e: any) => {
    setUserInput(e.target.value as string)
  }

  return (
    <Dialog
      open={true}
      onClose={handleClose}
      aria-labelledby="form-dialog-title"
    >
      <DialogTitle id="form-dialog-title" className={classes.dialogTitle}>
        {formatMessage('new-contract-modal-message')}
      </DialogTitle>
      <DialogContent>
        {mode === 'import' && <RpcHostSelect />}
        <TextField
          autoFocus
          margin="dense"
          id="userInput"
          label={formatMessage(
            mode === 'create' ? 'new-contract-filename' : 'existing-contract-id'
          )}
          type="textarea"
          onChange={handleInputChange}
          fullWidth
        />
      </DialogContent>
      <RadioGroup
        value={mode}
        className={classes.radioContainer}
        onChange={handleRadioChange}
      >
        <FormControlLabel
          value="create"
          label={formatMessage('create-contract')}
          control={<Radio color="secondary" />}
        />
        <FormControlLabel
          value="import"
          label={formatMessage('import-contract')}
          control={<Radio color="secondary" />}
        />
      </RadioGroup>
      <DialogActions>
        <Button color="primary" onClick={handleSubmit}>
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default NewContractModal
