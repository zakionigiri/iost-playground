export type IostState = {
  // rpcHost: string
  // network: Network
  iost: IOST.IOST | null
  extensionState: ExtensionState
}

export enum ExtensionState {
  NOTINSTALLED = 'not-installed',
  ENABLED = 'enabled',
  DISABLED = 'disabled',
  LOADING = 'loading'
}
