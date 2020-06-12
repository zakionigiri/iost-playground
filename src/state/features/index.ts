import { combineReducers } from '@reduxjs/toolkit'
import { ActionType } from 'typesafe-actions'
import contract from './contract'
import iost from './iost'
import db from './db'
import view from './view'
// import notification from './notification'

import { combineEpics } from 'redux-observable'
import { ContractActions } from './contract/slices'
import { IOSTActions } from './iost/slices'
import { DBActions } from './db/slices'
import { ViewActions } from './view/slices'

export const rootReducer = combineReducers({
  iost: iost.reducer,
  contract: contract.reducer,
  db: db.reducer,
  view: view.reducer
})

export const epics = combineEpics(...iost.epics, ...db.epics, ...view.epics)

export type AllActions = ContractActions | IOSTActions | DBActions | ViewActions
