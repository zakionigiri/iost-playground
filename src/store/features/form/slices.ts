import { FormState, ArgTypes, TransactionResult } from './types'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ActionType } from 'typesafe-actions'

const initialState: FormState = {
  functions: {
    selectedContract: '',
    selectedFunction: '',
    isLoading: false,
    args: {},
    results: [],
    settings: { approve: { tokenName: 'iost', amount: 0 }, chainId: 1020 }
  }
}

const formSlice = createSlice({
  name: 'formSlice',
  initialState,
  reducers: {
    selectContract: (state, action: PayloadAction<string>) => {
      state.functions.selectedContract = action.payload
      if (state.functions.args[action.payload] == null) {
        state.functions.args[action.payload] = {}
      }
    },
    selectFunction: (state, action: PayloadAction<string>) => {
      const fn = action.payload
      const contract = state.functions.selectedContract as string

      state.functions.selectedFunction = fn

      if (state.functions.args[contract][fn] == null) {
        state.functions.args[contract][fn] = []
      }
    },
    setFunctionArgs: (
      state,
      action: PayloadAction<{
        index: number
        arg: ArgTypes
      }>
    ) => {
      const { arg, index } = action.payload
      const { selectedContract, selectedFunction } = state.functions
      state.functions.args[selectedContract][selectedFunction][index] = arg
    },
    resetFunctionArgs: (
      state,
      action: PayloadAction<{ contractId: string; functionName: string }>
    ) => {
      const { contractId, functionName } = action.payload
      state.functions.args[contractId][functionName] = []
    },
    sendFunctionFormStart: (state, _action: PayloadAction<void>) => {
      state.functions.isLoading = true
    },
    sendFunctionFormSuccess: (
      state,
      action: PayloadAction<TransactionResult>
    ) => {
      state.functions.results.push(action.payload)
      state.functions.isLoading = false
    },
    sendFunctionFormFail: (state, action: PayloadAction<TransactionResult>) => {
      state.functions.results.push(action.payload)
      state.functions.isLoading = false
    }
  }
})

export const {
  selectContract,
  selectFunction,
  setFunctionArgs,
  resetFunctionArgs,
  sendFunctionFormSuccess,
  sendFunctionFormFail,
  sendFunctionFormStart
} = formSlice.actions
export default formSlice.reducer
export type FormActions = ActionType<typeof formSlice.actions>
