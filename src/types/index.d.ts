interface Window {
  IWalletJS: {
    account: { name: string; network: string }
    enable: () => Promise<IOSTJS.Account>
    iost: IOSTJS.IOST
    network: Network
    newIOST: (i: IOSTJS.IOST) => IOSTJS.IOST
    rpc: IOSTJS.RPC
    setAccount: (param: { account: string; network: string }) => void
  }
}

type chrome = any

type Network = 'MAINNET' | 'TESTNET' | 'LOCALNET'
