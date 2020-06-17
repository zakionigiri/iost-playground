import { addNotification } from './slices'
import { v4 } from 'uuid'
import { NotificationTypes } from './types'

export const addNotificationOp = (messageId: string, type: NotificationTypes) =>
  addNotification({
    id: v4(),
    messageId,
    type
  })
