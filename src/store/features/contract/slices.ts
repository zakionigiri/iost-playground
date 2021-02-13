import { ContractState, Contract, Abi } from './types'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ActionType } from 'typesafe-actions'
import * as _ from 'lodash'
import defaultContract from '../../../lib/contracts/default'
import { DB } from '../db/types'
import { compileCode, restoreContract, getFileNameWithExtension } from 'lib'

const initialState: ContractState = {
  isPending: false,
  isReady: false,
  isSaved: true,
  savedState: [],
  contracts: [],
  errors: [],
}

const contract = createSlice({
  name: 'contract',
  initialState,
  reducers: {
    initializeContractStateStart: (state, action: PayloadAction<DB>) => {
      state.isReady = false
    },
    initializeContractStateSuccess: (
      state,
      action: PayloadAction<{
        _rev: ContractState['_rev'] | null
        contracts: Contract[]
      }>
    ) => {
      const { contracts, _rev } = action.payload
      state.contracts = contracts
      state.savedState = contracts
      state._rev = _rev || ''
      state.isReady = true
    },
    initializeContractStateFail: (state, action: PayloadAction<any>) => {
      state.isReady = false
    },
    saveContractSuccess: (
      state,
      action: PayloadAction<{
        _rev: ContractState['_rev']
        contracts: ContractState['contracts']
      }>
    ) => {
      state._rev = action.payload._rev
      state.savedState = action.payload.contracts
      state.isSaved = true
    },
    setContractCode: (
      state,
      action: PayloadAction<{
        fileName: Contract['fileName']
        code: Contract['code']
        type: 'code' | 'abi'
      }>
    ) => {
      const { fileName: targetFileName, code, type } = action.payload
      const index = state.contracts.findIndex(
        ({ fileName }) => fileName === targetFileName
      )
      type === 'code'
        ? (state.contracts[index].code = code)
        : (state.contracts[index].abiStr = code)
      state.isSaved = isSaved(state.savedState, state.contracts)
    },
    removeContract: (state, action: PayloadAction<Contract['fileName']>) => ({
      ...state,
      contracts: state.contracts.filter(
        ({ fileName }) => fileName !== action.payload
      ),
      isSaved: isSaved(state.savedState, state.contracts),
    }),
    createContract: (
      state,
      action: PayloadAction<{
        fileName: Contract['fileName']
      }>
    ) => {
      const { fileName } = action.payload
      const contract: Contract = {
        fileName: getFileNameWithExtension(fileName),
        code: defaultContract,
        contractId: '',
        abiStr: '',
        network: null,
      }
      state.contracts.push(contract)
      state.isSaved = false
    },
    setContractId: (
      state,
      action: PayloadAction<{ fileName: string; contractId: string }>
    ) => {
      const { fileName, contractId } = action.payload
      if (!fileName) return
      const index = state.contracts.findIndex(c => c.fileName === fileName)
      state.contracts[index].contractId = contractId
    },
    compileContract: (
      state,
      action: PayloadAction<{ fileName: string; code: string }>
    ) => {
      const { fileName: targetFileName, code } = action.payload
      const index = state.contracts.findIndex(
        ({ fileName }) => fileName === targetFileName
      )
      state.contracts[index].abiStr = compileCode(code)
    },
    importStart: (state, action: PayloadAction<string>) => {
      state.isPending = true
    },
    importSuccess: (
      state,
      action: PayloadAction<{
        network: string
        contract: IOST.Response.Contract
      }>
    ) => {
      const { id, code, abis } = action.payload.contract
      const contract: Contract = {
        fileName: getFileNameWithExtension(id),
        contractId: id,
        network: action.payload.network,
        code: restoreContract(code),
        abiStr: JSON.stringify(
          {
            lang: 'javascript',
            version: '1.0.0',
            abi: abis,
          },
          null,
          2
        ),
      }
      state.contracts.push(contract)
      state.isSaved = false
      state.isPending = false
    },
    importFail: (state, action) => {
      state.isPending = false
    },
  },
})

const isSaved = (
  lastSavedState: ContractState['savedState'],
  currentState: ContractState['contracts']
) => {
  const val1 = [...lastSavedState]
  const val2 = [...currentState]
  return _.isEqual(val1, val2)
}

export const {
  setContractCode,
  removeContract,
  initializeContractStateStart,
  initializeContractStateSuccess,
  initializeContractStateFail,
  createContract,
  saveContractSuccess,
  compileContract,
  importStart,
  importFail,
  importSuccess,
  setContractId,
} = contract.actions
export default contract.reducer
export type ContractActions = ActionType<typeof contract.actions>
