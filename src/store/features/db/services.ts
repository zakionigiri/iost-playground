import { DB } from './types'
import { ContractState } from '../contract/types'

const _id = 'contracts/v1'

export const saveStateToDb = async (
  db: DB,
  contracts: ContractState['contracts'],
  _rev: ContractState['_rev']
) => {
  const res = await db.put({
    _id,
    _rev: _rev || undefined,
    contracts
  })

  if (res.ok !== true) {
    throw new Error('Some error occurred')
  }

  return {
    _rev: res.rev,
    contracts
  }
}

export const getSavedState = async (
  db: DB
): Promise<{
  _rev: string
  contracts: ContractState['contracts']
}> => {
  const res = await db
    .get<{ contracts: ContractState['contracts'] }>(_id)
    .catch(e => {
      console.log(e)
    })

  if (res == null) {
    return {
      _rev: '',
      contracts: []
    }
  }

  return {
    _rev: res._rev,
    contracts: res.contracts
  }
}
