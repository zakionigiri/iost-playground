import React, { useEffect } from 'react'
import { Contract, Abi } from '../../store/features/contract/types'
import useLocale from 'hooks/useLocale'
import FunctionForm from '../FunctionForm'
import { useDispatch } from 'react-redux'
import { selectContract } from '../../store/features/form/slices'

type Props = {
  contract: Contract
}

const ContractActions: React.FC<Props> = ({ contract }) => {
  const { contractId, network, abiStr } = contract
  const abi: Abi = abiStr ? JSON.parse(abiStr) : []
  const dispatch = useDispatch()
  const { formatMessage } = useLocale()

  useEffect(() => {
    dispatch(selectContract(contractId))
  }, [])

  return (
    <div>
      {network !== null && (
        <div>
          Deployed Network: {network}
          <br />
          ContractId: {contractId}
          <FunctionForm abi={abi.abi} />
        </div>
      )}
    </div>
  )
}

export default ContractActions
