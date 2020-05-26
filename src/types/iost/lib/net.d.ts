declare namespace IOSTJS {
  class Net {
    constructor(rpc: RPC)

    getProvider: () => HTTPProvider
    getNodeInfo: () => Promise<string>
  }
}
