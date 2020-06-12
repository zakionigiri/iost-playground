import React from 'react'
import { List, ListItem, Input } from '@material-ui/core'
import useStyles from './styles'
import { IwalletIOST } from '../../provider/AccountProvider'
import BaseList, { ListItemParams } from '../BaseList/index'

type Props = {
  iost: IOST.IOST
  setIost: IwalletIOST['setIost']
  network: Network
}

const getInputType = (key: string) => {
  if (key === 'defaultLimit') {
    return 'text'
  }

  return 'number'
}

const IWalletAccountInfo: React.FC<Props> = ({ iost, setIost, network }) => {
  const classes = useStyles()

  const handleConfigChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    // Better to modify property 'config' via defined funcs in the class but there's no func like that.
    const { name, value } = e.target

    if (name === 'defaultLimit') {
      iost.config.defaultLimit = value as IOST.Config['defaultLimit']
    } else {
      iost.config[name as keyof IOST.Config] = parseInt(value)
    }

    const i = Object.assign({}, iost)
    setIost(i)
  }

  const listItems: ListItemParams[] = [
    {
      key: 'network_name',
      title: 'Network',
      component: network
    },
    {
      key: 'account_name',
      title: 'Account Name',
      component: iost.account?.getID() || ''
    },
    {
      key: 'config',
      title: 'Config',
      isReactComponent: true,
      component: (
        <List>
          {Object.keys(iost.config).map(key => {
            return (
              <ListItem key={key} className={classes.listItemContainer}>
                <div className={classes.titleContainer}>
                  <p className={classes.listItemTitle}>{key}:</p>
                </div>
                <div className={classes.inputContainer}>
                  <Input
                    onChange={handleConfigChange}
                    type={getInputType(key)}
                    name={key}
                    className={classes.configInput}
                    value={iost.config[key as keyof IOST.Config]}
                  />
                </div>
              </ListItem>
            )
          })}
        </List>
      )
    }
  ]

  return <BaseList items={listItems} />
}

export default IWalletAccountInfo
