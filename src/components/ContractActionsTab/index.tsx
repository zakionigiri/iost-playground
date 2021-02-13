import React, { useEffect } from 'react'
import { Contract, Abi } from '../../store/features/contract/types'
import useLocale from 'hooks/useLocale'
import FunctionForm from '../FunctionForm'
import { useDispatch } from 'react-redux'
import {
  selectContract,
  sendFunctionFormStart,
} from '../../store/features/form/slices'
import { Grid, Button } from '@material-ui/core'
import useStyles from './styles'

type Props = {
  contract: Contract
}

const ContractActions: React.FC<Props> = ({ contract }) => {
  const { contractId, network, abiStr, code } = contract
  const abi: Abi = abiStr ? JSON.parse(abiStr) : []
  const dispatch = useDispatch()
  const classes = useStyles()
  const { formatMessage } = useLocale()

  useEffect(() => {
    dispatch(selectContract(contractId))
  }, [])

  const handlePublish = async () => {
    dispatch(
      sendFunctionFormStart({
        fileName: contract.fileName,
        contractId: 'system.iost',
        functionName: 'setCode',
        args: [
          JSON.stringify({
            info: abi,
            code,
          }),
        ],
      })
    )
  }

  return (
    <Grid container className={classes.container} direction="column">
      <Button color="secondary" variant="outlined" onClick={handlePublish}>
        Publish
      </Button>
      <Button color="default" variant="contained">
        Update
      </Button>
      {network !== null && (
        <>
          <div className={classes.contractInfoTitle}>
            {formatMessage('deployed-network')}:
          </div>
          {network}
          <br />
          <div className={classes.contractInfoTitle}>
            {formatMessage('contract-id')}:
          </div>{' '}
          {contractId}
          <FunctionForm abi={abi.abi} />
        </>
      )}
    </Grid>
  )
}

export default ContractActions
