import { DBState, DB } from './types'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ActionType } from 'typesafe-actions'

const initialState: DBState = {
  db: null,
  isLoaded: false
}

const dbSlice = createSlice({
  name: 'db',
  initialState,
  reducers: {
    initializeDB: (state, action: PayloadAction<DB>) => {
      state.db = action.payload
      state.isLoaded = true
    },
    saveStart: (
      _state,
      _action: PayloadAction<{
        db: DB
        _rev: string | null
        data: any
      }>
    ) => {
      //
    },
    saveSuccess: (state, action: PayloadAction<void>) => {
      //
    },
    saveFail: (state, action: PayloadAction<void>) => {
      //
    }
  }
})

export const {
  initializeDB,
  saveStart,
  saveSuccess,
  saveFail
} = dbSlice.actions
export default dbSlice.reducer
export type DBActions = ActionType<typeof dbSlice.actions>
