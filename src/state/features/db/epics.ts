import { Epic } from 'redux-observable'
import { AllActions } from '..'
import { exhaustMap, mergeMap, map, catchError } from 'rxjs/operators'
import { defer, of } from 'rxjs'
import { getSavedState, saveStateToDb } from './services'
import { saveStart, saveFail, saveSuccess } from './slices'
import { ActionType } from 'typesafe-actions'
import {
  initializeContractStateStart,
  initializeContractStateFail,
  initializeContractStateSuccess,
  saveContractSuccess
} from '../contract/slices'

export const getStateEpic: Epic<AllActions, AllActions> = action$ =>
  action$
    .ofType<ActionType<typeof initializeContractStateStart>>(
      initializeContractStateStart.type
    )
    .pipe(
      map(action => action.payload),
      exhaustMap(db =>
        defer(() => getSavedState(db)).pipe(
          mergeMap(state => of(initializeContractStateSuccess(state))),
          catchError(e => of(initializeContractStateFail(e)))
        )
      )
    )

export const saveStateEpic: Epic<AllActions, AllActions> = action$ =>
  action$.ofType<ActionType<typeof saveStart>>(saveStart.type).pipe(
    map(action => action.payload),
    mergeMap(({ db, data, _rev }) =>
      defer(() => saveStateToDb(db, data, _rev || undefined)).pipe(
        mergeMap(res => of(saveSuccess(), saveContractSuccess(res))),
        catchError(e => of(saveFail()))
      )
    )
  )

export default [getStateEpic, saveStateEpic]
