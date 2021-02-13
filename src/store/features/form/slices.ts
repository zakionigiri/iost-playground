import {
  FormState,
  ArgTypes,
  TransactionResult,
  TransactionPayload,
} from './types'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ActionType } from 'typesafe-actions'
import * as _ from 'lodash'

const initialState: FormState = {
  functions: {
    selectedContract: '',
    selectedFunction: '',
    isLoading: false,
    args: {},
    results: [],
    settings: { approve: { tokenName: 'iost', amount: 0 }, chainId: 1024 },
  },
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
      const funcName = action.payload
      const contract = state.functions.selectedContract as string

      state.functions.selectedFunction = funcName

      if (state.functions.args[contract][funcName] == null) {
        state.functions.args[contract][funcName] = []
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
    sendFunctionFormStart: (
      state,
      _action: PayloadAction<TransactionPayload>
    ) => {
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
      if (_.isEmpty(action.payload) === false) {
        state.functions.results.push(action.payload)
      }

      state.functions.isLoading = false
    },
  },
})

export const {
  selectContract,
  selectFunction,
  setFunctionArgs,
  resetFunctionArgs,
  sendFunctionFormSuccess,
  sendFunctionFormFail,
  sendFunctionFormStart,
} = formSlice.actions
export default formSlice.reducer
export type FormActions = ActionType<typeof formSlice.actions>
