import React, { useState } from 'react'
import ContractTabs from './presentation'
import { useSelector, useDispatch } from 'react-redux'
import { getContractState } from '../../state/features/contract/selectors'
import {
  removeContract,
  compileContract
} from '../../state/features/contract/slices'
import { openDialog } from 'state/features/view/slices'

const ContractTabsContainer = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [tabValue, setTabValue] = useState(0)
  const contractState = useSelector(getContractState)
  const dispatch = useDispatch()

  const handleTabChange = (e: React.ChangeEvent<{}>, value: number) => {
    setTabValue(value)
  }

  const handleDeleteFile = (uid: string) => {
    dispatch(removeContract(uid))
  }

  const handleCompile = (uid: string, code: string) => {
    dispatch(compileContract({ uid, code }))
  }

  const handleOpenDialog = (isOpen: boolean) => {
    setIsDialogOpen(!isOpen)
  }

  return (
    <ContractTabs
      contracts={contractState.contracts}
      handleDeleteFile={handleDeleteFile}
      tabValue={tabValue}
      handleTabChange={handleTabChange}
      handleCompile={handleCompile}
    />
  )
}

export default ContractTabsContainer
