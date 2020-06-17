const decl = `/* eslint-disable @typescript-eslint/triple-slash-reference */
// base definnitions for all IOST contract modules that are not specific to any version of TypeScript
/// <reference types="./IOST/IOST.d.ts" />
/// <reference types="./IOST/callback.d.ts" />
/// <reference types="./IOST/account.d.ts" />
/// <reference types="./IOST/tx_handler.d.ts" />
/// <reference types="./lib/rpc.d.ts" />
/// <reference types="./lib/net.d.ts" />
/// <reference types="./lib/structs.d.ts" />
/// <reference types="./lib/transaction.d.ts" />
/// <reference types="./lib/blockchain.d.ts" />

/// <reference types="./lib/provider/httpprovider.d.ts" />

/// <reference types="./lib/crypto/algorithm.d.ts" />
/// <reference types="./lib/crypto/keypair.d.ts" />
/// <reference types="./lib/crypto/signature.d.ts" />
// TypeScript Version: 3.7
/// <reference types="base.d.ts" />

declare module 'IOST'
export = IOST
export as namespace IOST
declare namespace IOST {
  class Account {
    constructor(id: string)

    addKeyPair: (kp: KeyPair, permission?: string) => void
    getID: () => string
    getKeyPair: (permission: string) => KeyPair
    // static import: (json: string) => void
    sign: (t: Tx, permission: string) => void
    signTx: (t: Tx) => void
  }
}
declare namespace IOST {
  class CallBack {
    transaction: Tx
    map: {}
    status: string
    hash: string

    constructor(trnasaction: Tx)

    on: (msg: Msg, f: Msg) => CallBack
    pushMsg: (msg: Msg) => void | null
  }

  type Msg = 'success' | 'pending' | 'failed'
}
declare namespace IOST {
  class IOST {
    public rpc?: RPC
    public account?: Account
    public serverTimeDif: number
    public config: Config

    constructor(config?: Config)

    callABI: (contract: string, abi: string, args: string[]) => Tx
    transfer: (
      token: string,
      from: string,
      to: string,
      amount: string,
      memo?: string
    ) => Tx
    newAccount: (
      name: string,
      creator: string,
      ownerkey: string,
      activekey: string,
      initialRAM: number,
      initialGasPledge: number
    ) => Tx
    signAndSend: (tx: Tx) => CallBack
    currentAccount: Account
    currentRPC: RPC
    setRPC: (rpc: RPC) => Promise<void>
    setAccount: (account: Account) => void
  }

  interface Config {
    gasRatio: number
    gasLimit: number
    delay: number
    expiration: number
    defaultLimit: 'unlimited' | number
  }
}
declare namespace IOST {
  class TxHandler {
    public tx: Tx
    public status: 'idle' | 'pending' | 'success' | 'failed'
    public Pending: (response: any) => void
    public Success: (response: any) => void
    public Failed: (res: any) => void

    constructor(tx: Tx, rpc: RPC)

    onPending: (c: CallBack) => TxHandler
    onSuccess: (c: CallBack) => TxHandler
    onFailed: (c: CallBack) => TxHandler
    send: () => TxHandler
    listen: (interval: number, times: number) => null

    static SinpleTx: (
      contract: string,
      abi: string,
      args: any,
      config: Config
    ) => Tx
  }
}
declare namespace IOST {
  class Blockchain {
    constructor(IOST: IOST)

    getChainInfo: () => Promise<string>
    getBlockByHash: (hash: string, complete: boolean) => Promise<string>
    getBlockByNum: (num: number, complete: boolean) => Promise<string>
    getBalance: (
      address: string,
      tokenSymbol?: string,
      useLongestChain?: number
    ) => Promise<string>
    getToken721Balance: (
      address: string,
      tokenSymbol: string,
      useLongestChain?: number
    ) => Promise<string>
    getToken721Metadata: (
      tokenSymbol: string,
      tokenID: string,
      useLongestChain?: number
    ) => Promise<string>
    getToken721Owner: (
      tokenSymbol: string,
      tokenID: string,
      useLongestChain?: number
    ) => Promise<string>
    getContract: (id: string, useLongestChain?: number) => Promise<string>
    getContractStorage: (
      contractID: string,
      key: string,
      field?: string,
      pending?: boolean
    ) => Promise<{ data: string }>
    getContractStorageFields: (
      contractID: string,
      key: string,
      pending?: boolean
    ) => Promise<string>
    getAccountInfo: (id: string, reversible: boolean) => Promise<string>
    getGasRatio: () => Promise<string>
    getGasUsage: (actionName: string) => Promise<string>
    getExchangeContractInfo: () => Promise<string>
    // {
    //     return {
    //         "contractID": "ContractZGVqhY3c65xRs8aoC4dUdACVCKSwhMMsg2negSFxpr3",
    //         "minAmount": 100,
    //         "initialRAM": 1000,
    //         "initialGasPledged": 10
    //     }
    // }
    // }
  }
}
declare namespace IOST {
  const Algorithm: {
    Ed25519: 2
    Secp256k1: 1
  }
}
declare namespace IOST {
  class KeyPair {
    public id: string
    public t: string
    public seckey: string
    public pubkey: string

    constructor(priKeyBytes: Buffer, algType?: Algorithm)

    static newKeyPair: (algType?: Algorithm) => KeyPair

    B58SecKey: () => string
    B58PubKey: () => string
  }
}
declare namespace IOST {
  class Signature {
    public algorithm?: string
    public pubkey?: string
    public sig?: string

    constructor(info: string | null, keyPair: KeyPair)

    toJSON: () => {
      algorithm: 'SECP256K1' | 'ED25519'
      public_key: string
      signature: string
    }
    static fromJSON: (json: string) => Signature
    verify: (info: string) => boolean
  }
}
declare namespace IOST {
  class Net {
    constructor(rpc: RPC)

    getProvider: () => HTTPProvider
    getNodeInfo: () => Promise<string>
  }
}
declare namespace IOST {
  class HTTPProvider {
    constructor(host: string, timeout?: number)

    send: (
      method: 'get' | 'post',
      url: string,
      data: string
    ) => Promise<Response>
  }

  type Response = import('axios').AxiosResponse
}
declare namespace IOST {
  class RPC {
    provider: HTTPProvider
    net: Net
    blockchain: Blockchain
    transaction: Transaction

    constructor(provider: HTTPProvider)

    setProvider: (provider: HTTPProvider) => void
    getProvider: () => HTTPProvider
  }
}
declare namespace IOST {
  class Tx {
    public gasRatio: number
    public gasLimit: number
    public actions: []
    public signers: []
    public signatures: []
    public publisher: string
    public publisher_sigs: string[]
    public amount_limit: []
    public chain_id: number
    public reserved: null
    public delay: number
    public time: number
    public expiration: number

    constructor(gasRatio: number, gasLimit: string)

    setChainID: (id: number) => void
    addSigner: (name: string, permission: string) => void
    addApprove: (token: string, amount: number | string) => void
    getApproveList: () => AmountLimit[]
    addAction: (contract: string, abi: string, args: string) => void
    setTime: (
      expirationInSecound: number,
      delay: number,
      serverTimeDiff: number
    ) => void
    setGas: (gasRatio: number, gasLimit: string) => void
    addSign: (kp: KeyPair) => void
    addPublishSign: (publisher: string, kp: KeyPair) => void
  }

  declare interface AmountLimit {
    token: string
    value: number
  }

  declare interface Action {
    contract: string
    actionName: string
    data: []
  }
}
declare namespace IOST {
  class Transaction {
    constructor(IOST: IOST)

    sendTx: (tx: Tx) => Promise<string>
    getTxByHash: (hash: string) => Promise<string>
    getTxReceiptByHash: (hash: string) => Promise<string>
    getTxReceiptByTxHash: (txHash: string) => Promise<string>
  }
}
declare namespace IOST {
  declare namespace Response {
    type NodeInfo = {
      build_time: string
      git_hash: string
      mode: string
      network: {
        id: string
        peer_count: number
      }
      code_version: string
      server_time: string
    }
    type ChainInfo = {
      net_name: string
      protocol_version: string
      chain_id: number
      head_block: string
      head_block_hash: string
      lib_block: string
      lib_block_hash: string
      witness_list: string[]
      lib_witness_list: string[]
      pending_witness_list: string[]
      head_block_time: string
      lib_block_time: string
    }
    type Block = {
      status: string
      block: {
        hash: string
        version: string
        parent_hash: string
        tx_merkle_hash: string
        tx_receipt_merkle_hash: string
        number: string
        witness: string
        time: string
        gas_usage: number
        tx_count: string
        info: Info
        transactions: Tx[]
      }
    }

    type Info = {
      mode: 0 | 1
      thread: number
      batch_index: number[]
    }

    type TokenInfo = {
      symbol: string
      full_name: string
      issuer: string
      total_supply: string
      current_supply: string
      decimal: number
      can_transfer: boolean
      only_issuer_can_transfer: boolean
      total_supply_float: number
      current_supply_float: number
    }
    type TokenBalance = {
      balance: number
      frozen_balances: FrozenBalance[]
    }
    type Token721Balance = {
      balance: string
      tokenIDs: string[]
    }
    type Token721Metadata = {
      metadata: string
    }
    type Token721Owner = {
      owner: string
    }
    type Contract = {
      id: string
      code: string
      language: string
      version: string
      abis: Abi[]
    }

    type Abi = {
      name: string
      args: string[]
      amount_limit: AmountLimit[]
      description?: string
    }

    type Storage = {
      data: string
      block_hash: string
      block_number: string
    }

    type StorageFields = {
      fields: string[]
      block_hash: string
      block_number: string
    }

    type GasInfo = {
      current_total: number
      increase_speed: number
      limit: number
      pledge_gas: number
      pledged_info: PledgedInfo[]
      transferable_gas: number
    }

    type RamInfo = {
      available: string
      used: string
      total: string
    }

    type PledgedInfo = {
      pledger: string
      amount: number
    }

    type Group = {
      name: string
      items: PermissionItem[]
    }

    type Permission<T> = {
      name: T
      group_names: string[]
      items: PermissionItem[]
      threshold: string
    }

    type PermissionItem = {
      id: string
      is_key_pair: boolean
      weight: number
      permission: string
    }

    type AccountInfo = {
      name: string
      balance: number
      gas_info: GasInfo
      ram_info: RamInfo
      permissions: {
        active: Permission<'active'>
        owner: Permission<'owner'>
        [key: string]: Permission<string>
      }
      groups: Group[]
      frozen_balances: FrozenBalance[]
      vote_infos: VoteInfo[]
    }

    type VoteInfo = {
      option: string
      votes: string
      cleared_votes: string
    }

    type FrozenBalance = {
      amount: number
      time: string
    }

    type Tx = {
      status: string
      transaction: {
        hash: string
        time: string
        expiration: string
        gas_ratio: number
        gas_limit: number
        delay: string
        chain_id: number
        actions: { contract: string; action_name: string; data: string }[]
        signers: []
        publisher: string
        referred_tx: string
        amount_limit: AmountLimit[]
        tx_receipt: TxReceipt
      }
      block_number: string
    }
    type TxReceipt = {
      tx_hash: string
      gas_usage: number
      status_code: string
      message: string
      ram_usage: { [key: string]: string }
      returns: string[]
      receipts: Receipt[]
    }

    type Receipt = {
      func_name: string
      content: string
    }

    type GasRatio = {
      lowest_gas_ratio: number
      median_gas_ratio: number
    }
    type RAMInfo = {
      used_ram: string
      available_ram: string
      total_ram: string
      sell_price: number
      buy_price: number
    }
  }
}

`
export default decl
