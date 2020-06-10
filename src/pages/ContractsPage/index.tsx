import React, { useState, useEffect } from 'react'
import Layout from '../../components/Layout'
import ContractTabs from '../../components/ContractTabs'
import helloWorldContract from '../../lib/contracts/helloWorld'
import { setContract, setContractList, getContractList } from '../../lib'

export type Mode = 'javascript' | 'json'

const ContractsPage = () => {
  useEffect(() => {
    const contractList = getContractList()

    if (contractList.length === 0) {
      setContract('helloWorld.js', helloWorldContract)
      setContractList(['helloWorld.js'])
    }
  }, [])

  return (
    <Layout>
      <ContractTabs />
    </Layout>
  )
}

export default ContractsPage
