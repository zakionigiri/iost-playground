import { ViewState, DialogInfo, Notification } from './types'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ActionType } from 'typesafe-actions'

const initialState: ViewState = {
  dialogs: {},
  notifications: []
}

const viewSlice = createSlice({
  name: 'view',
  initialState,
  reducers: {
    openDialog: (
      state,
      action: PayloadAction<{ id: string; info: DialogInfo }>
    ) => {
      const { id, info } = action.payload
      state.dialogs[id] = info
    },
    closeDialog: (state, action: PayloadAction<string>) => {
      state.dialogs[action.payload].isOpen = false
    },
    addNotification(state, action: PayloadAction<Notification>) {
      state.notifications.push(action.payload)
    },
    deleteNotification(state, action: PayloadAction<string>) {
      state.notifications = state.notifications.filter(
        n => n.id !== action.payload
      )
    }
  }
})

export const {
  openDialog,
  closeDialog,
  addNotification,
  deleteNotification
} = viewSlice.actions
export default viewSlice.reducer
export type ViewActions = ActionType<typeof viewSlice.actions>
