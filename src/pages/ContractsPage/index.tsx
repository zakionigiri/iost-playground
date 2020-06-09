import React, { useState, useEffect } from 'react'
import Layout from '../../components/Layout'
import ContractTabs from '../../components/ContractTabs'
import helloWorldContract from '../../lib/contracts/helloWorld'
import { setContract, setContractList } from '../../lib'

export type Mode = 'javascript' | 'json'

const ContractsPage = () => {
  useEffect(() => {
    const contracts = window.localStorage.getItem('iost_playground_files')

    if (contracts == null || contracts === '[]') {
      setContract('helloWorld.js', helloWorldContract)
      setContractList('helloWorld.js')
    }
  }, [])

  return (
    <Layout>
      <ContractTabs />
    </Layout>
  )
}

export default ContractsPage
