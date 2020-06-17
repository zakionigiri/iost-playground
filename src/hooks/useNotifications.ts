import { useDispatch } from 'react-redux'
import { NotificationTypes } from 'store/features/view/types'
import { addNotificationOp } from 'store/features/view/operations'

const useNotifications = () => {
  const dispatch = useDispatch()

  const notify = (messageId: string, type: NotificationTypes) => {
    dispatch(addNotificationOp(messageId, type))
  }

  return {
    notify
  }
}

export default useNotifications
