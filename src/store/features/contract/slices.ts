import { ContractState, Contract, Abi } from './types'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ActionType } from 'typesafe-actions'
import * as _ from 'lodash'
import defaultContract from '../../../lib/contracts/default'
import { DB } from '../db/types'
import { compileCode } from 'lib'

const initialState: ContractState = {
  isReady: false,
  isSaved: true,
  savedState: [],
  contracts: [],
  errors: []
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
        uid: Contract['uid']
        code: Contract['code']
        type: 'code' | 'abi'
      }>
    ) => {
      const { uid: targetContractUid, code, type } = action.payload
      const index = state.contracts.findIndex(
        ({ uid }) => uid === targetContractUid
      )
      type === 'code'
        ? (state.contracts[index].code = code)
        : (state.contracts[index].abiStr = code)
      state.isSaved = isSaved(state.savedState, state.contracts)
    },
    removeContract: (state, action: PayloadAction<Contract['uid']>) => ({
      ...state,
      contracts: state.contracts.filter(({ uid }) => uid !== action.payload),
      isSaved: isSaved(state.savedState, state.contracts)
    }),
    createContract: (
      state,
      action: PayloadAction<{
        uid: Contract['uid']
        fileName: Contract['fileName']
      }>
    ) => {
      const { fileName, uid } = action.payload
      const contract: Contract = {
        uid,
        fileName,
        code: defaultContract,
        contractId: '',
        network: null,
        abiStr: ''
      }
      state.contracts.push(contract)
      state.isSaved = isSaved(state.savedState, state.contracts)
    },
    compileContract: (
      state,
      action: PayloadAction<{ uid: string; code: string }>
    ) => {
      const { uid: targetContractUid, code } = action.payload
      const index = state.contracts.findIndex(
        ({ uid }) => uid === targetContractUid
      )
      state.contracts[index].abiStr = compileCode(code)
    }
    // importStart: () => {},
    // importSuccess: () => {},
    // importFail: () => {}
  }
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
  compileContract
} = contract.actions
export default contract.reducer
export type ContractActions = ActionType<typeof contract.actions>
