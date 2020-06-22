import { Epic, StateObservable } from 'redux-observable'
import {
  initializeStart,
  InitializeActionPayload,
  initializeSuccess,
  initializeFail
} from './slices'
import {
  importStart,
  importSuccess,
  importFail,
  setContractId
} from '../contract/slices'
import { map, exhaustMap, mergeMap, catchError, filter } from 'rxjs/operators'
import { defer, of } from 'rxjs'
import {
  loadAccount,
  getContract,
  sendTransaction,
  publishContract
} from './services'
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
            addNotificationOp('success', 'import-success'),
            closeDialog()
          )
        ),
        catchError(e =>
          of(
            importFail(e.message),
            addNotificationOp('error', 'error::import-fail', contractId)
          )
        )
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
      map(action => action.payload),
      map(({ functionName, contractId, args, fileName = '' }) => {
        const { settings } = store$.value.form.functions
        return {
          fileName,
          params: {
            ...settings,
            contractId,
            functionName,
            args
          }
        }
      }),
      exhaustMap(({ fileName, params }) =>
        defer(() => sendTransaction(store$.value.iost.iost, params)).pipe(
          mergeMap(res =>
            of(
              sendFunctionFormSuccess(res),
              addNotificationOp('success', res.message),
              setContractId({
                fileName,
                contractId: JSON.parse(res.result.returns[0])[0]
              })
            )
          ),
          catchError(e =>
            of(
              sendFunctionFormFail(e),
              addNotificationOp('error', e.message, e.messages || '')
            )
          )
        )
      )
    )

export default [initializeIOSTEpic, importContractEpic, sendTransactionEpic]
