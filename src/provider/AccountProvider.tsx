import React, { createContext, useContext, useEffect, useState } from 'react'
import IOST from 'iost'

export type AccountInfo = {
  isExtensionInstalled: boolean | null
  iost: IOSTJS.IOST | null
  isDataLoaded: boolean
  reloadAccoun?: () => Promise<void>
}

export const useIOST = () => useContext<AccountInfo>(AccountContext)

const iwallet = window.IWalletJS

const AccountContext = createContext<AccountInfo>({
  isExtensionInstalled: null,
  iost: null,
  isDataLoaded: false
})

const AccountProvider: React.FC = ({ children }) => {
  const [isExtensionInstalled, setIsExtensionInstalled] = useState<
    boolean | null
  >(null)
  const [iost, setIost] = useState<IOST.IOST | null>(null)
  const [isDataLoaded, setIsDataLoaded] = useState(false)

  useEffect(() => {
    const f = async () => {
      if (iwallet == null) {
        console.log('No iwallet found')
        return setIsExtensionInstalled(false)
      }

      await reloadAccount()
    }

    f()
  }, [])

  const reloadAccount = async () => {
    if (iwallet == null) {
      return setIsExtensionInstalled(false)
    }

    const account: IOSTJS.Account | void = await iwallet
      .enable()
      .catch((e: Error) => {
        console.log(e)
      })
    const iost = iwallet.newIOST(IOST) as IOSTJS.IOST

    if (!account) {
      return
    }

    iost.setAccount(account)
    // const rpc = new IOST.RPC(new IOST.HTTPProvider(`${host}:${port}`))
    // iost.setRPC(rpc)
    setIost(iost)
    setIsDataLoaded(true)
  }

  const value = {
    isExtensionInstalled,
    iost,
    isDataLoaded,
    reloadAccount
  }

  return (
    <AccountContext.Provider value={value}>{children}</AccountContext.Provider>
  )
}

export default AccountProvider
