import { ViewState, Notification } from './types'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ActionType } from 'typesafe-actions'

const initialState: ViewState = {
  dialogs: {
    isOpen: false,
    Component: null
  },
  tabs: {},
  notifications: []
}

const viewSlice = createSlice({
  name: 'view',
  initialState,
  reducers: {
    openDialog: (
      state,
      action: PayloadAction<{
        element: () => JSX.Element
      }>
    ) => {
      const { element } = action.payload
      return {
        ...state,
        dialogs: {
          isOpen: true,
          Component: element
        }
      }
    },
    closeDialog: (state, _action: PayloadAction<void>) => {
      return {
        ...state,
        dialogs: {
          isOpen: false,
          Component: null
        }
      }
    },
    addNotification(state, action: PayloadAction<Notification>) {
      state.notifications.push(action.payload)
    },
    deleteNotification(state, action: PayloadAction<string>) {
      state.notifications = state.notifications.filter(
        n => n.id !== action.payload
      )
    },
    changeTab(state, action: PayloadAction<{ id: string; value: number }>) {
      const { id, value } = action.payload
      state.tabs[id] = { value }
    }
  }
})

export const {
  openDialog,
  closeDialog,
  addNotification,
  deleteNotification,
  changeTab
} = viewSlice.actions
export default viewSlice.reducer
export type ViewActions = ActionType<typeof viewSlice.actions>
