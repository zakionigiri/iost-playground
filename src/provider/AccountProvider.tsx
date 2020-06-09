import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  Dispatch,
  SetStateAction
} from 'react'
import IOST from 'iost'
import { getApiUrl } from '../lib/index'
import axios, { AxiosResponse } from 'axios'

type AccountInfo = {
  account?: IOSTJS.Response.AccountInfo
  isDataFetched: boolean
} & IwalletIOST

export type IwalletIOST = {
  extensionState: {
    isInstalled: boolean | null
    isEnabled?: boolean
  }
  network: Network
  iost: IOSTJS.IOST | null
  setIost: Dispatch<SetStateAction<IwalletIOST['iost']>> | Function
  isDataLoaded: boolean
  loadAccount?: () => Promise<void>
}

export const useIOST = () => useContext<AccountInfo>(AccountContext)

const AccountContext = createContext<AccountInfo>({
  extensionState: {
    isInstalled: null
  },
  network: 'TESTNET',
  iost: null,
  setIost: new Function(),
  isDataLoaded: false,
  isDataFetched: false
})

const AccountProvider: React.FC = ({ children }) => {
  const [extensionState, setExtensionState] = useState<
    IwalletIOST['extensionState']
  >({ isInstalled: null })
  const [account, setAccount] = useState<IOSTJS.Response.AccountInfo>()
  const [network, setNetwork] = useState<Network>('TESTNET')
  const [iost, setIost] = useState<IOSTJS.IOST | null>(null)
  const [isDataLoaded, setIsDataLoaded] = useState(false)
  const [isDataFetched, setIsDataFetched] = useState(false)

  /**
   * iWallet extension becomes accessible after loading done
   */
  window.addEventListener('load', () =>
    loadAccount().then(() => setIsDataLoaded(true))
  )

  useEffect(() => {
    const f = async () => {
      if (iost === null) {
        return
      }

      const url = getApiUrl(network, true)
      const res: AxiosResponse<
        IOSTJS.Response.AccountInfo
      > | void = await axios
        .get(`${url}/getAccount/${iost.account?.getID()}/true`)
        .catch(e => {
          console.log(
            'Request to %s/getAccount/%s/true failed',
            url,
            iost.account?.getID()
          )
          console.error(e)
        })

      if (!res) {
        setIsDataFetched(true)
        return
      }

      setAccount(res.data)
      setIsDataFetched(true)
    }

    setIsDataFetched(false)
    setAccount(undefined)
    f()
  }, [iost])

  /**
   * Load account info from iWallet extension
   * @param {string} networkInfo
   */
  const loadAccount = async (networkInfo?: string) => {
    window.postMessage({ action: 'GET_ACCOUNT' }, '*') // Reload iWallet extension
    const iwallet = window.IWalletJS

    if (iwallet === undefined) {
      return setExtensionState({ isInstalled: false })
    }

    const account: IOSTJS.Account | void = await iwallet
      .enable()
      .catch((e: { type: string }) => {
        console.log(e)
        if (e.type === 'locked') {
          setExtensionState({
            isInstalled: true,
            isEnabled: false
          })
        }
      })

    if (!account) {
      return
    }

    const url = networkInfo ? networkInfo : getApiUrl(iwallet.network, true)

    const iost = iwallet.newIOST(IOST) as IOSTJS.IOST
    const rpc: IOSTJS.RPC = new IOST.RPC(new IOST.HTTPProvider(url))
    iost.setAccount(account)
    iost.setRPC(rpc)
    setNetwork(iwallet.network)
    setIost(iost)
  }

  const rpcHostSelect = () => {}

  const value = {
    extensionState,
    network,
    iost,
    setIost,
    isDataLoaded,
    isDataFetched,
    account,
    loadAccount
  }

  return (
    <AccountContext.Provider value={value}>{children}</AccountContext.Provider>
  )
}

export default AccountProvider
