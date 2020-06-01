import React from 'react'
import { useIOST } from '../../provider/AccountProvider'
import NoExtensionMessage from '../../components/Messages/NoExtension'
import NotEnabledMessage from '../../components/Messages/NotEnabled'
import ReloadButton from '../../components/ReloadButton'
import IWalletInfoList from '../../components/IWalletInfoList'
import useStyles from './styles'
import AccountInfoList from '../../components/AccountInfoList'
import Layout from '../../components/Layout'
import { Divider } from '@material-ui/core'

const AccountPage = () => {
  const classes = useStyles()

  const {
    extensionState,
    isDataLoaded,
    iost,
    loadAccount,
    setIost,
    network,
    account,
    isDataFetched
  } = useIOST()

  if (isDataLoaded === false) {
    return <div />
  }

  if (extensionState.isInstalled === false) {
    return <NoExtensionMessage />
  }

  const refreshPage = () => window.location.reload()

  if (extensionState.isEnabled === false) {
    return (
      <div className={classes.itemContainer}>
        <NotEnabledMessage />
        <ReloadButton loadFunction={refreshPage} />
      </div>
    )
  }

  return (
    <Layout>
      <>
        {iost && (
          <>
            <div className={classes.itemContainer}>
              <ReloadButton
                loadFunction={loadAccount ? () => loadAccount() : refreshPage}
              />
            </div>
            <h2 className={classes.title}>iWallet Configuration</h2>
            <IWalletInfoList iost={iost} setIost={setIost} network={network} />
            <Divider />
            <h2 className={classes.title}>Account Info</h2>
            <AccountInfoList account={account} isDataFetched={isDataFetched} />
          </>
        )}
      </>
    </Layout>
  )
}

export default AccountPage
