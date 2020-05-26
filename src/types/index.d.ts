interface Window {
  IWalletJS: {
    account: { name: string; network: string }
    enable: () => Promise<IOSTJS.Account>
    iost: IOSTJS.IOST
    network: string
    newIOST: (i: IOSTJS.IOST) => IOSTJS.IOST
    rpc: IOSTJS.RPC
  }
}
