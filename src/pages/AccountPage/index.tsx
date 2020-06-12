import React from 'react'
import NoExtensionMessage from '../../components/Messages/NoExtension'
import NotEnabledMessage from '../../components/Messages/NotEnabled'
import ReloadButton from '../../components/ReloadButton'
import IWalletInfoList from '../../components/IWalletInfoList'
import useStyles from './styles'
import AccountInfoList from '../../components/AccountInfoList'
import Layout from '../../components/Layout'
import { Divider } from '@material-ui/core'
import { useSelector } from 'react-redux'
import { selectIostState } from 'state/features/iost/selectors'
import { ExtensionState } from 'state/features/iost/types'

const AccountPage = () => {
  const classes = useStyles()
  const { iost, extensionState } = useSelector(selectIostState)

  if (extensionState === ExtensionState.LOADING) {
    return <div />
  }

  if (extensionState === ExtensionState.NOTINSTALLED) {
    return (
      <Layout>
        <NoExtensionMessage />
      </Layout>
    )
  }

  const refreshPage = () => window.location.reload()

  if (extensionState === ExtensionState.DISABLED) {
    return (
      <Layout>
        <div className={classes.itemContainer}>
          <NotEnabledMessage />
          <ReloadButton loadFunction={refreshPage} />
        </div>
      </Layout>
    )
  }

  return (
    <Layout>
      <>
        {iost && (
          <>
            <div className={classes.itemContainer}>
              <ReloadButton loadFunction={refreshPage} />
            </div>
            <h2 className={classes.title}>iWallet Configuration</h2>
            <Divider />
            <h2 className={classes.title}>Account Info</h2>
          </>
        )}
      </>
    </Layout>
  )
}

export default AccountPage
