import { Contract } from '../contract/types'

export type FormState = {
  contract: ContractForm
}

export type ContractForm = {
  type: 'import' | 'create'
  name: string
}

export type FunctionForm = {
  [uid: string]: {
    // Contract['uid']
    args: string | number | boolean[]
  }
}
