export type Contract = {
  uid: string
  fileName: string
  contractId: string
  code: string
  abi: Abi | null
  network: Network | 'CUSTOM' | null
}

export type Abi = {
  language: 'javascript'
  version: '1.0.0'
  abi: IOST.Response.Abi[]
}

export type ContractState = {
  _rev?: string
  isReady: boolean
  isSaved: boolean
  savedState: Contract[]
  contracts: Contract[]
  errors: {
    code: string
    message: string
  }[]
}
