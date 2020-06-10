import React, { createContext, useContext, useState } from 'react'
import Snackbar from '@material-ui/core/Snackbar'
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert'
import { makeStyles, Theme } from '@material-ui/core/styles'
import { Typography } from '@material-ui/core'

type NotificationTypes = 'success' | 'error' | 'warning' | 'info'

type NotificationValues = {
  showNotification: (
    title: string,
    message: string,
    type: NotificationTypes
  ) => void
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

const NotificationCtx = createContext<NotificationValues>({
  showNotification: () => {
    //
  }
})

export const useNotification = () => useContext(NotificationCtx)

const NotificationProvider: React.FC = ({ children }) => {
  const classes = useStyles()
  const [title, setTitle] = useState('')
  const [message, setMessage] = useState('')
  const [type, setType] = useState<NotificationTypes>()
  const [open, setOpen] = useState(false)

  const showNotification = (
    title: string,
    message: string,
    type: NotificationTypes
  ) => {
    setOpen(true)
    setType(type)
    setTitle(title)
    setMessage(message)
    setTimeout(close, 10000)
  }

  const close = () => {
    setOpen(false)
    setTitle('')
    setMessage('')
    setType(undefined)
  }

  const handleClose = (_: React.SyntheticEvent, reason?: string) => {
    if (reason === 'clickaway') {
      return
    }

    close()
  }

  return (
    <NotificationCtx.Provider value={{ showNotification }}>
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
    </NotificationCtx.Provider>
  )
}

export default NotificationProvider
