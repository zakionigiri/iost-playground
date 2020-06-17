export type Contract = {
  fileName: string
  contractId: string
  code: string
  abiStr: string
  network: string | null
}

export type Abi = {
  language: 'javascript'
  version: '1.0.0'
  abi: IOST.Response.Abi[]
}

export type ContractState = {
  isPending: boolean
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
