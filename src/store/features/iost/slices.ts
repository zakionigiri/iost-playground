import { IostState, ExtensionState } from './types'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ActionType } from 'typesafe-actions'

const initialState: IostState = {
  //   rpcHost: testnet,
  //   network: 'TESTNET',
  iost: null,
  extensionState: ExtensionState.LOADING
}

export type InitializeActionPayload = {
  iwallet: Window['IWalletJS']
}

const IOSTSlice = createSlice({
  name: 'iost',
  initialState,
  reducers: {
    initializeStart: (
      state,
      _action: PayloadAction<InitializeActionPayload>
    ) => {
      state.extensionState = ExtensionState.LOADING
    },
    initializeSuccess: (state, action: PayloadAction<IostState['iost']>) => {
      state.iost = action.payload
      state.extensionState = ExtensionState.ENABLED
    },
    initializeFail: (
      state,
      action: PayloadAction<{
        reason: ExtensionState.DISABLED | ExtensionState.NOTINSTALLED
      }>
    ) => {
      state.extensionState = action.payload.reason
    }
    // TODO should I use IOST account without iWallet extension?
  }
})

export const {
  initializeFail,
  initializeStart,
  initializeSuccess
} = IOSTSlice.actions
export default IOSTSlice.reducer
export type IOSTActions = ActionType<typeof IOSTSlice.actions>
