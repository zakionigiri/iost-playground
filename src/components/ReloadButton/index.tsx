import React from 'react'
import RefreshIcon from '@material-ui/icons/Refresh'
import useStyles from './styles'
import { Button } from '@material-ui/core'

type Props = {
  loadFunction: () => void | Promise<void>
}

const ReloadButton: React.FC<Props> = ({ loadFunction }) => {
  const classes = useStyles()

  return (
    <Button
      color="primary"
      variant="contained"
      className={classes.buttonContainer}
      onClick={loadFunction}
    >
      <RefreshIcon className={classes.reloadIcon} />
      <p>Reload</p>
    </Button>
  )
}

export default ReloadButton
