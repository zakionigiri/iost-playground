export type ViewState = {
  dialogs: DialogState
  notifications: Notification[]
  tabs: TabState
}

export type DialogState =
  | {
      isOpen: false
      Component: null
    }
  | {
      Component: () => JSX.Element
      isOpen: true
    }

export type Notification = {
  id: string
  type: NotificationTypes
  message: string
}

export type TabState = {
  [id: string]: {
    value: number
  }
}

export type NotificationTypes = 'success' | 'error' | 'warning' | 'info'
