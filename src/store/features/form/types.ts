export type FormState = {
  functions: FunctionForm
}

export type FunctionForm = {
  selectedContract: string
  selectedFunction: string
  isLoading: boolean
  results: TransactionResult[]
  settings: {
    chainId: number
    approve: {
      tokenName: string
      amount: number
    }
  }
  args: {
    [contractId: string]: {
      [functionName: string]: ArgTypes[]
    }
  }
}

export type ArgTypes = string | number | boolean

export type TransactionResult = {
  type: 'success' | 'error'
  txId: string
  return: any
  message: string
}
