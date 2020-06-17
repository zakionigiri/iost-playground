import Iost from 'iost'
import { ExtensionState } from './types'
import axios, { AxiosResponse } from 'axios'

export const loadAccount = async (
  iwallet?: Window['IWalletJS']
): Promise<IOST.IOST> => {
  if (iwallet == null) {
    throw new Error(ExtensionState.NOTINSTALLED)
  }

  const account: IOST.Account = await iwallet.enable().catch(e => {
    if (e.type === 'locked') {
      throw new Error(ExtensionState.DISABLED)
    }
    console.log(e)
    throw new Error('Some unknown error happened')
  })

  const apiHost = 'https://test.api.iost.io'
  const iost = iwallet.newIOST(Iost)
  const rpc = new IOST.RPC(new IOST.HTTPProvider(apiHost))
  iost.setAccount(account)
  iost.setRPC(rpc)

  return iost
}

export const getContract = async (
  endpoint: string,
  id: string,
  byLongestChain: boolean
) => {
  const res: AxiosResponse<IOST.Response.Contract> = await axios.get(
    `${endpoint}/getContract/${id}/${byLongestChain}`
  )

  if (res.data == null) {
    throw new Error('No Contract found')
  }

  return res.data
}
