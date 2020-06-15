import { SettingsState, SettingsPayload } from './types'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ActionType } from 'typesafe-actions'

export const allowedLocales = ['ja-JP', 'en-US'] as const

const initialState: SettingsState = {
  locale: 'ja-JP',
  compile: {
    showConfirmation: true
  }
}

const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    changeSettings: (state, action: PayloadAction<SettingsPayload>) => {
      return {
        ...state,
        ...action.payload
      }
    },
    resetSettings: (_state, _action) => {
      return {
        ...initialState
      }
    }
  }
})

export const { changeSettings, resetSettings } = settingsSlice.actions
export default settingsSlice.reducer
export type SettingsActions = ActionType<typeof settingsSlice.actions>
