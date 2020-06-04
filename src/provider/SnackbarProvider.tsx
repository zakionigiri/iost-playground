import React, { createContext, useContext, useState } from 'react'
import Button from '@material-ui/core/Button'
import Snackbar from '@material-ui/core/Snackbar'
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert'
import { makeStyles, Theme } from '@material-ui/core/styles'
import { Typography } from '@material-ui/core'

type SnackbarTypes = 'success' | 'error' | 'warning' | 'info'

type SnackbarValues = {
  showSnackbar: (title: string, message: string, type: SnackbarTypes) => void
}

const Alert = (props: AlertProps) => {
  return <MuiAlert elevation={6} variant="filled" {...props} />
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(0)
    }
  }
}))

const SnackbarCtx = createContext<SnackbarValues>({
  showSnackbar: () => {
    //
  }
})

export const useSnackbar = () => useContext(SnackbarCtx)

const SnackbarProvider: React.FC = ({ children }) => {
  const classes = useStyles()
  const [title, setTitle] = useState('')
  const [message, setMessage] = useState('')
  const [type, setType] = useState<SnackbarTypes>()
  const [open, setOpen] = React.useState(false)

  const showSnackbar = (
    title: string,
    message: string,
    type: SnackbarTypes
  ) => {
    setOpen(true)
    setType(type)
    setTitle(title)
    setMessage(message)
    setTimeout(() => {
      setOpen(false)
      setTitle('')
      setMessage('')
      setType(undefined)
    }, 10000)
  }

  const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === 'clickaway') {
      return
    }

    setOpen(false)
  }

  return (
    <SnackbarCtx.Provider value={{ showSnackbar }}>
      {open && (
        <div className={classes.root}>
          <Snackbar
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            open={open}
            autoHideDuration={10000}
            onClose={handleClose}
          >
            {type && (
              <Alert severity={type} onClose={handleClose}>
                <div>
                  <Typography component="h2" style={{ fontWeight: 'bold' }}>
                    {title}
                  </Typography>
                  {message && <Typography component="p">{message}</Typography>}
                </div>
              </Alert>
            )}
          </Snackbar>
        </div>
      )}
      {children}
    </SnackbarCtx.Provider>
  )
}

export default SnackbarProvider
