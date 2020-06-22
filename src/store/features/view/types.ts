export type ViewState = {
  dialogs: DialogState
  notifications: Notification[]
  tabs: TabState
  drawer: DrawerState
}

export type DrawerState = {
  isOpen: boolean
  selected: DrawerTabTypes
}

export type DrawerTabTypes = 'Contracts' | 'Account' | 'API' | 'Settings'

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
  messageId: string
  messages?: string[]
}

export type TabState = {
  [id: string]: {
    value: number
  }
}

export type NotificationTypes = 'success' | 'error' | 'warning' | 'info'
