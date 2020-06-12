export type ViewState = {
  dialogs: DialogState
  notifications: Notification[]
}

export type DialogState = {
  [id: string]: DialogInfo
}

export type DialogInfo = {
  isOpen: boolean
  submitFn: Function
  cancelFn?: Function
  title: string
  message: string
  otherComponent?: JSX.Element
}

export type Notification = {
  id: string
  type: NotificationTypes
  messageId: string
}

export type NotificationTypes = 'success' | 'error' | 'warning' | 'info'
