import React from 'react'
import { Typography } from '@material-ui/core'

const NotEnabledMessage = () => {
  return (
    <Typography>
      It seems that you have not logged in to iWallet chrome extension.
      <br />
      Please login and reload the page
    </Typography>
  )
}

export default NotEnabledMessage
