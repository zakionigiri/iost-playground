declare namespace IOSTJS {
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
