import Iost from 'iost'
import { getApiUrl } from 'lib'
import { ExtensionState } from './types'

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

  const apiHost = getApiUrl(iwallet.network, true)
  const iost = iwallet.newIOST(Iost)
  const rpc = new IOST.RPC(new IOST.HTTPProvider(apiHost))
  iost.setAccount(account)
  iost.setRPC(rpc)

  return iost
}
