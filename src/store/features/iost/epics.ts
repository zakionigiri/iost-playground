import { Epic, StateObservable } from 'redux-observable'
import {
  initializeStart,
  InitializeActionPayload,
  initializeSuccess,
  initializeFail
} from './slices'
import { importStart, importSuccess, importFail } from '../contract/slices'
import { map, exhaustMap, mergeMap, catchError } from 'rxjs/operators'
import { defer, of } from 'rxjs'
import { loadAccount, getContract } from './services'
import { AllActions } from '..'
import { RootState } from 'store'
import { addNotification, closeDialog } from '../view/slices'
import { addNotificationOp } from '../view/operations'

const initializeIOSTEpic: Epic<AllActions, AllActions> = action$ =>
  action$.ofType(initializeStart.type).pipe(
    map(action => action.payload as InitializeActionPayload),
    exhaustMap(({ iwallet }) =>
      defer(() => loadAccount(iwallet)).pipe(
        mergeMap(iost => of(initializeSuccess(iost))),
        catchError(e => of(initializeFail(e.message)))
      )
    )
  )

const importContractEpic: Epic<AllActions, AllActions> = (
  action$,
  store$: StateObservable<RootState>
) =>
  action$.ofType(importStart.type).pipe(
    map(action => action.payload as string),
    exhaustMap(contractId =>
      defer(() =>
        getContract(store$.value.settings.rpcHost, contractId, true)
      ).pipe(
        mergeMap(res =>
          of(
            importSuccess(res),
            addNotificationOp('import-success', 'success'),
            closeDialog()
          )
        ),
        catchError(e =>
          of(importFail(e.message), addNotificationOp('import-fail', 'error'))
        )
      )
    )
  )

export default [initializeIOSTEpic, importContractEpic]
