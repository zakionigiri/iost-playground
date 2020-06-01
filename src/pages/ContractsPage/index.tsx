import React, { useState, useEffect } from 'react'
import Layout from '../../components/Layout'
import ContractTabs from '../../components/ContractTabs'
import helloWorldContract from '../../lib/contracts/helloWorld'
import helloWorldAbi from '../../lib/contracts/helloWorldAbi'

export type Mode = 'javascript' | 'json'

const ContractsPage = () => {
  useEffect(() => {
    const defaultContract = window.localStorage.getItem(
      'iost_playground_helloWorld.js'
    )

    if (defaultContract == null) {
      window.localStorage.setItem(
        'iost_playground_helloWorld.js',
        helloWorldContract
      )
      window.localStorage.setItem(
        'iost_playground_helloWorld.js.abi',
        helloWorldAbi
      )
    }
  }, [])

  return (
    <Layout>
      <ContractTabs />
    </Layout>
  )
}

export default ContractsPage
