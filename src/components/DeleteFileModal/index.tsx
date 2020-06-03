import React, { useState } from 'react'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogTitle from '@material-ui/core/DialogTitle'
import useStyles from './styles'

type Props = {
  closeFn: () => void
  handleDeleteFile: () => void
  fileName: string
}

const DeleteFileModal: React.FC<Props> = ({
  closeFn,
  handleDeleteFile,
  fileName
}) => {
  const classes = useStyles()

  return (
    <div>
      <Dialog open={true} onClose={closeFn} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title" className={classes.dialogTitle}>
          Are you sure to delete contract{' '}
          {<span className={classes.fileName}>{fileName}</span>} ?
        </DialogTitle>
        <DialogActions>
          <Button color="secondary" onClick={handleDeleteFile}>
            Delete
          </Button>
          <Button color="primary" onClick={closeFn}>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

export default DeleteFileModal
