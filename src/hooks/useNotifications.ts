import { useDispatch } from 'react-redux'
import { NotificationTypes } from 'store/features/view/types'
import { addNotification } from 'store/features/view/slices'
import { v4 } from 'uuid'

const useNotifications = () => {
  const dispatch = useDispatch()

  const notify = (messageId: string, type: NotificationTypes) => {
    dispatch(
      addNotification({
        id: v4(),
        messageId,
        type
      })
    )
  }

  return {
    notify
  }
}

export default useNotifications
