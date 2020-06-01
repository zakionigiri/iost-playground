import React from 'react'
import { Typography } from '@material-ui/core'

type Props = {
  fileName: string
}

const NoFileExistsMessage: React.FC<Props> = ({ fileName }) => {
  return <Typography>No such file ({fileName}) has been found</Typography>
}

export default NoFileExistsMessage
