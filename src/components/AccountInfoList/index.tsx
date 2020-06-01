import React from 'react'
import useStyles from './styles'
import CircularProgress from '@material-ui/core/CircularProgress'
import NoAccountFound from '../Messages/NoAccountFound'
import BaseList, { ListItemParams } from '../BaseList'

type Props = {
  account: IOSTJS.Response.AccountInfo | undefined
  isDataFetched: boolean
}

const AccountInfo: React.FC<Props> = ({ account, isDataFetched }) => {
  const classes = useStyles()

  if (isDataFetched === false) {
    return (
      <div className={classes.progressContainer}>
        <CircularProgress />
      </div>
    )
  }

  if (account == null && isDataFetched === true) {
    console.log(account, isDataFetched)
    return <NoAccountFound />
  }

  if (account == null) {
    return <div />
  }

  const listItems: ListItemParams[] = [
    {
      key: 'name',
      title: 'Account Name',
      component: account.name
    },
    {
      key: 'balance',
      title: 'Balance',
      component: '' + account.balance
    },
    {
      key: 'gas_info',
      title: 'Gas Info',
      component: account.gas_info
    },
    {
      key: 'ram_info',
      title: 'Ram Info',
      component: account.ram_info
    },
    {
      key: 'permissions',
      title: 'Permission',
      component: account.permissions
    },
    {
      key: 'groups',
      title: 'Groups',
      component: account.groups
    },
    {
      key: 'frozen_balances',
      title: 'Frozen Balance',
      component: account.frozen_balances
    },
    {
      key: 'votes_info',
      title: 'Vote Info',
      component: account.vote_infos
    }
  ]

  return <BaseList items={listItems} />
}

export default AccountInfo
