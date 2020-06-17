import { RootState } from 'store'
import { createSelector } from '@reduxjs/toolkit'

export const selectDialogs = (state: RootState) => state.view.dialogs
export const selectDrawer = (state: RootState) => state.view.drawer

export const selectViewState = (state: RootState) => state.view

export const selectNotifications = (state: RootState) =>
  state.view.notifications

export const selectTab = (tabName: string) =>
  createSelector(selectViewState, view => view.tabs[tabName])
