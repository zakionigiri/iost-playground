import React, { useState, useEffect } from 'react'
import Layout from '../../components/Layout'
import ContractTabs from '../../components/ContractTabs'
import helloWorldContract from '../../lib/contracts/helloWorld'
import { isArray } from 'util'

export type Mode = 'javascript' | 'json'

const ContractsPage = () => {
  useEffect(() => {
    const contracts = window.localStorage.getItem('iost_playground_files')

    if (contracts == null || contracts === '[]') {
      window.localStorage.setItem(
        'iost_playground_helloWorld.js',
        helloWorldContract
      )
      window.localStorage.setItem(
        'iost_playground_files',
        JSON.stringify(['helloWorld.js'])
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
