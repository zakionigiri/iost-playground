import React from 'react'
import { Typography } from '@material-ui/core'

const InvalidExtensionMessage = () => {
  return (
    <Typography>
      File extension is invalid. It should either '.js' or '.abi'
    </Typography>
  )
}

export default InvalidExtensionMessage
