import Iost from 'iost'
import { ExtensionState } from './types'
import axios, { AxiosResponse } from 'axios'
import { ArgTypes, TransactionResult } from '../form/types'
import { Abi } from '../contract/types'
import abi from 'lib/contracts/helloWorldAbi'

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

  // const apiHost = 'https://test.api.iost.io'
  const apiHost = 'http://localhost:30001'
  const iost = iwallet.newIOST(Iost)
  iost.config.gasLimit = 4000000
  const rpc = new IOST.RPC(new IOST.HTTPProvider(apiHost))
  iost.setAccount(account)
  iost.setRPC(rpc)

  return iost
}

export const sendTransaction = async (
  iost: IOST.IOST | null,
  params: {
    contractId: string
    functionName: string
    chainId: number
    approve: {
      tokenName: string
      amount: number | 'unlimited'
    }
    args: ArgTypes[]
  }
): Promise<TransactionResult> => {
  if (iost === null) {
    throw new Error('error::no-iost-instance')
  }

  const { chainId, contractId, approve, args, functionName } = params

  if (args == null) {
    throw new Error('error::no-function-selected')
  }

  const tx = iost.callABI(contractId, functionName, args)
  tx.setChainID(chainId)
  tx.addApprove(approve.tokenName, approve.amount)

  return await new Promise((resolve, reject) => {
    let txId = ''
    iost
      .signAndSend(tx)
      .on('pending', (res: string) => {
        txId = res
      })
      .on('success', (res: string) => {
        const result: TransactionResult = {
          result: res,
          type: 'success',
          txId,
          message: 'transaction-success',
        }
        resolve(result)
      })
      .on('failed', (res: string) => {
        const result: TransactionResult = {
          result: res,
          type: 'error',
          txId,
          message: 'error::transaction-fail',
          messages: functionName,
        }
        reject(result)
      })
  })
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

export const publishContract = async (
  iost: IOST.IOST | null,
  params: {
    chainId: number
    code: string
    abi: Abi
  }
) =>
  sendTransaction(iost, {
    contractId: 'system.iost',
    functionName: 'setCode',
    chainId: params.chainId,
    approve: {
      amount: 'unlimited',
      tokenName: '*',
    },
    args: [
      JSON.stringify({
        info: params.abi,
        code: params.code,
      }),
    ],
  })
