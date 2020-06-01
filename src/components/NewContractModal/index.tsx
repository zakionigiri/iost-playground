import React, { useState } from 'react'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import { RadioGroup, FormControlLabel, Radio } from '@material-ui/core'
import useStyles from './styles'

type Props = {
  closeFn: () => void
  createFn: (fileName: string) => void
  importFn: (contractId: string) => Promise<void>
}

const NewContractModal: React.FC<Props> = ({ closeFn, createFn, importFn }) => {
  const classes = useStyles()
  const [mode, setMode] = useState('create')
  const [userInput, setUserInput] = useState('')

  const handleRadioChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    value: string
  ) => {
    setMode(value)
  }

  const handleSubmit = () => {
    if (mode === 'create') {
      createFn(userInput)
    } else {
      importFn(userInput)
    }
  }

  const handleInputChange = (e: any) => {
    setUserInput(e.target.value as string)
  }

  return (
    <div>
      <Dialog open={true} onClose={closeFn} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title" className={classes.dialogTitle}>
          Create / Import a smart contract
        </DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="userInput"
            label={mode === 'create' ? 'New contract name' : 'Contract ID'}
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
            label="Create new contract"
            control={<Radio color="secondary" />}
          />
          <FormControlLabel
            value="import"
            label="Import existing contract"
            control={<Radio color="secondary" />}
          />
        </RadioGroup>
        <DialogActions>
          <Button color="primary" onClick={handleSubmit}>
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

export default NewContractModal
