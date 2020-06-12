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
