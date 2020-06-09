import React from 'react'
import Button from '@material-ui/core/Button'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import { useIntl } from 'provider/IntlProvider'

type Props = {
  fileNameWithExtension: string
  closeFn: () => void
  anchor: Element
}

const ContractMenu: React.FC<Props> = ({
  fileNameWithExtension,
  closeFn,
  anchor
}) => {
  const { formatMessage } = useIntl()
  return (
    <Menu
      id="contract-menu"
      keepMounted
      open={true}
      onClose={closeFn}
      anchorEl={anchor}
    >
      <MenuItem onClick={closeFn}>{formatMessage('delete-contract')}</MenuItem>
      <MenuItem onClick={closeFn}>{formatMessage('rename-contract')}</MenuItem>
    </Menu>
  )
}

export default ContractMenu
