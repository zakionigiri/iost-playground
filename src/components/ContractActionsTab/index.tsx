import React from 'react'
import { Contract, Abi } from '../../store/features/contract/types'
import Button from '@material-ui/core/Button'
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
import { closeDialog } from '../../store/features/view/slices'
import FunctionForm from '../FunctionForm'

type Props = {
  contract: Contract
}

const ContractActions: React.FC<Props> = ({ contract }) => {
  const { code, contractId, fileName, network, abiStr } = contract
  const abi: Abi = abiStr ? JSON.parse(abiStr) : []

  const { formatMessage } = useLocale()
  const dispatch = useDispatch()

  const handleDeleteFile = (fileName: string) => {
    dispatch(removeContract(fileName))
  }

  const handleCompile = (fileName: string, code: string) => {
    try {
      dispatch(compileContract({ fileName, code }))
      dispatch(addNotificationOp('compile-success', 'success'))
    } catch (e) {
      dispatch(addNotificationOp('compile-fail', 'error'))
    }
  }

  const handleClose = () => {
    dispatch(closeDialog())
  }

  return (
    <div>
      <Button
        variant="contained"
        color="primary"
        onClick={() => handleCompile(fileName, code)}
      >
        {formatMessage('compile-code')}
      </Button>
      <Button
        variant="contained"
        color="secondary"
        onClick={() =>
          dispatch(openDeleteDialogOp(fileName, handleDeleteFile, handleClose))
        }
      >
        {formatMessage('delete-code')}
      </Button>
      {network !== null && <FunctionForm abi={abi.abi} />}
    </div>
  )
}

export default ContractActions
