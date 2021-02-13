import { Epic, StateObservable } from 'redux-observable'
import { AllActions } from '..'
import {
  exhaustMap,
  filter,
  mergeMap,
  map,
  catchError,
  switchMap,
} from 'rxjs/operators'
import { defer, of } from 'rxjs'
import { getSavedState, saveStateToDb } from './services'
import { saveStart, saveFail, saveSuccess } from './slices'
import { ActionType } from 'typesafe-actions'
import {
  initializeContractStateStart,
  initializeContractStateFail,
  initializeContractStateSuccess,
  saveContractSuccess,
} from '../contract/slices'
import { RootState } from 'store'
import { DB } from './types'
import { addNotification } from '../view/slices'

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

export const saveStateEpic: Epic<AllActions, AllActions> = (
  action$,
  store$: StateObservable<RootState>
) =>
  action$.ofType<ActionType<typeof saveStart>>(saveStart.type).pipe(
    map(action => action.payload),
    filter(() => store$.value.db.db != null),
    switchMap(() =>
      defer(() =>
        saveStateToDb(
          store$.value.db.db as DB,
          store$.value.contract.contracts,
          store$.value.contract._rev
        )
      ).pipe(
        mergeMap(res =>
          of(
            saveSuccess(),
            saveContractSuccess(res),
            addNotification({
              messageId: 'save-success',
              type: 'success',
              id: '',
            })
          )
        ),
        catchError(e => of(saveFail(e)))
      )
    )
  )

export default [getStateEpic, saveStateEpic]
