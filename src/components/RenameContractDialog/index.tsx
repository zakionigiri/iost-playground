import React, { useState } from 'react'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import { useIntl } from '../../provider/IntlProvider'
import { renameContract } from '../../lib'
import { useNotification } from '../../provider/NotificationProvider'

type Props = {
  fileNameWithExtension: string
  closeFn: () => void
}

const RenameContractDialog: React.FC<Props> = ({
  closeFn,
  fileNameWithExtension
}) => {
  const [newName, setNewName] = useState('')
  const { formatMessage } = useIntl()
  const { showNotification } = useNotification()

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setNewName(e.target.value)
  }

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    renameContract(fileNameWithExtension, newName)
    showNotification('rename-success', '', 'success')
  }

  return (
    <Dialog open={true} onClose={closeFn} aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">
        {formatMessage('rename-contract-modal-message')}
      </DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          id="new-contract-name"
          label={formatMessage('rename-contract')}
          type="textarea"
          onChange={handleChange}
          fullWidth
        />
      </DialogContent>
      <DialogActions>
        <Button color="primary" onClick={handleSubmit}>
          {formatMessage('action::rename')}
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default RenameContractDialog
