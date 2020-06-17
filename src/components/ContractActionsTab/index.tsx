import React from 'react'
import { Contract } from '../../store/features/contract/types'
import Button from '@material-ui/core/Button'
import DeleteFileModal from '../../components/DeleteFileModal'
import useLocale from 'hooks/useLocale'
import { useDispatch } from 'react-redux'
import {
  compileContract,
  removeContract
} from '../../store/features/contract/slices'
import {
  addNotificationOp,
  openDeleteDialogOp
} from '../../store/features/view/operations'
import { openDialog, closeDialog } from '../../store/features/view/slices'

type Props = {
  contract: Contract
}

const ContractActions: React.FC<Props> = ({ contract }) => {
  const { formatMessage } = useLocale()
  const dispatch = useDispatch()

  const handleDeleteFile = (fileName: string) => {
    dispatch(removeContract(fileName))
  }

  const handleCompile = (fileName: string, code: string) => {
    dispatch(compileContract({ fileName, code }))
    dispatch(addNotificationOp('compile-success', 'success'))
  }

  const handleClose = () => {
    dispatch(closeDialog())
  }

  return (
    <div>
      <Button
        variant="contained"
        color="primary"
        onClick={() => handleCompile(contract.fileName, contract.code)}
      >
        {formatMessage('compile-code')}
      </Button>
      <Button
        variant="contained"
        color="secondary"
        onClick={() =>
          dispatch(
            openDeleteDialogOp(contract.fileName, handleDeleteFile, handleClose)
          )
        }
      >
        {formatMessage('delete-code')}
      </Button>
    </div>
  )
}

export default ContractActions
