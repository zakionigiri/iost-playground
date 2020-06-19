import { Epic, StateObservable } from 'redux-observable'
import {
  initializeStart,
  InitializeActionPayload,
  initializeSuccess,
  initializeFail
} from './slices'
import { importStart, importSuccess, importFail } from '../contract/slices'
import { map, exhaustMap, mergeMap, catchError, filter } from 'rxjs/operators'
import { defer, of } from 'rxjs'
import { loadAccount, getContract, sendTransaction } from './services'
import { AllActions } from '..'
import { RootState } from 'store'
import { closeDialog } from '../view/slices'
import { addNotificationOp } from '../view/operations'
import {
  sendFunctionFormStart,
  sendFunctionFormSuccess,
  sendFunctionFormFail
} from '../form/slices'
import { ActionType } from 'typesafe-actions'

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

const sendTransactionEpic: Epic<AllActions, AllActions> = (
  action$,
  store$: StateObservable<RootState>
) =>
  action$
    .ofType<ActionType<typeof sendFunctionFormStart>>(
      sendFunctionFormStart.type
    )
    .pipe(
      map(() => {
        const {
          args,
          selectedContract,
          selectedFunction,
          settings
        } = store$.value.form.functions
        return {
          contractId: selectedContract,
          functionName: selectedFunction,
          ...settings,
          args: args[selectedContract][selectedFunction]
        }
      }),
      exhaustMap(params =>
        defer(() => sendTransaction(store$.value.iost.iost, params)).pipe(
          mergeMap(res => of(sendFunctionFormSuccess(res))),
          catchError(e =>
            of(
              sendFunctionFormFail(e),
              addNotificationOp(`${e.txId}: ${e.message}`, 'error')
            )
          )
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
            importSuccess({
              contract: res,
              network: store$.value.settings.rpcHost
            }),
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

export default [initializeIOSTEpic, importContractEpic, sendTransactionEpic]
