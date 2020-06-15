import { Epic } from 'redux-observable'
import {
  initializeStart,
  InitializeActionPayload,
  initializeSuccess,
  initializeFail
} from './slices'
import { map, exhaustMap, mergeMap, catchError } from 'rxjs/operators'
import { defer, of } from 'rxjs'
import { loadAccount } from './services'
import { AllActions } from '..'

export const initializeIOSTEpic: Epic<AllActions, AllActions> = action$ =>
  action$.ofType(initializeStart.type).pipe(
    map(action => action.payload as InitializeActionPayload),
    exhaustMap(({ iwallet }) =>
      defer(() => loadAccount(iwallet)).pipe(
        mergeMap(iost => of(initializeSuccess(iost))),
        catchError(e => of(initializeFail(e.message)))
      )
    )
  )

export default [initializeIOSTEpic]
