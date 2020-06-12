import React, { useEffect } from 'react'
import Layout from '../../components/Layout'
import ContractTabs from '../../components/ContractTabs/presentation'
import { useDispatch, useSelector } from 'react-redux'
import { getContractState } from 'state/features/contract/selectors'
import { createContract } from 'state/features/contract/slices'

const ContractsPage = () => {
  const dispatch = useDispatch()
  const { isReady, contracts } = useSelector(getContractState)

  useEffect(() => {
    if (isReady === true && contracts.length === 0) {
      dispatch(
        createContract({
          uid: 'default',
          fileName: 'helloWorld'
        })
      )
    }
  }, [isReady])

  return <Layout>{isReady ? <ContractTabs /> : <></>}</Layout>
}

export default ContractsPage
