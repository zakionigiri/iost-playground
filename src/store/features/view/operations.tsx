import React from 'react'
import { addNotification, openDialog } from './slices'
import { v4 } from 'uuid'
import { NotificationTypes } from './types'
import { Contract } from '../contract/types'
import DeleteFileModal from 'components/DeleteFileModal'
import NewContractModal from 'components/NewContractModal'

export const addNotificationOp = (
  type: NotificationTypes,
  messageId: string,
  ...messages: string[]
) =>
  addNotification({
    id: v4(),
    type,
    messageId,
    messages,
  })

export const openDeleteDialogOp = (
  fileName: Contract['fileName'],
  deleteFn: (fileName: string) => void,
  closeFn: () => void
) =>
  openDialog({
    element: () => (
      <DeleteFileModal
        handleDeleteFile={() => deleteFn(fileName)}
        fileName={fileName}
        closeFn={closeFn}
      />
    ),
  })

export const openNewContractDialogOp = () =>
  openDialog({
    element: () => <NewContractModal />,
  })
