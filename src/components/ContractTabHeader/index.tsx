import React from 'react'
import useStyles from './styles'
import InsertDriveFileIcon from '@material-ui/icons/InsertDriveFile'
import { useDispatch } from 'react-redux'
import { openNewContractDialogOp } from 'store/features/view/operations'

const ContractTabHeader = () => {
  const classes = useStyles()
  const dispatch = useDispatch()

  return (
    <div>
      <div className={classes.container}>
        <div className={classes.titleContainer}>
          <h4>Files</h4>
        </div>
        <div
          className={classes.iconContainer}
          onClick={() => dispatch(openNewContractDialogOp())}
        >
          <InsertDriveFileIcon />
        </div>
      </div>
    </div>
  )
}

export default ContractTabHeader
