import { Epic } from 'redux-observable'
import { addNotification, deleteNotification, ViewActions } from './slices'
import { mergeMap, map, delay } from 'rxjs/operators'
import { of } from 'rxjs'
import { Notification } from './types'

export const showNotificationEpic: Epic<ViewActions, ViewActions> = action$ =>
  action$.ofType(addNotification.type).pipe(
    map(action => action.payload as Notification),
    mergeMap(notification => of(addNotification(notification))),
    delay(5000),
    map(action => deleteNotification(action.payload.id))
  )

export default [showNotificationEpic]
