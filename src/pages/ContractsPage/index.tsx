import React, { useEffect } from 'react'
import Layout from '../../components/Layout'
import ContractTabs from '../../components/ContractTabs'
import { useDispatch, useSelector } from 'react-redux'
import { getContractState } from 'store/features/contract/selectors'
import { createContract } from 'store/features/contract/slices'

const ContractsPage = () => {
  const dispatch = useDispatch()
  const { isReady, contracts } = useSelector(getContractState)

  useEffect(() => {
    if (isReady === true && contracts.length === 0) {
      dispatch(
        createContract({
          fileName: 'helloWorld.js'
        })
      )
    }
  }, [isReady])

  return <Layout>{isReady ? <ContractTabs /> : <></>}</Layout>
}

export default ContractsPage
