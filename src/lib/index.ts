import config from './config.json'

const TESTNET = 'TESTNET'
const MAINNET = 'MAINNET'
const LOCALNET = 'LOCALNET'

export const getApiUrl = (network: Network, withScheme?: boolean) => {
  const { host, port, scheme } = config[network]

  const url = host + (port !== 0 ? `:${port}` : '')

  return withScheme ? `${scheme}://${url}` : url
}

export const nets: Network[] = [TESTNET, MAINNET, LOCALNET]

export const getNetName = (net: string) => {
  switch (net) {
    case TESTNET:
      return 'Test net'
    case MAINNET:
      return 'Main net'
    case LOCALNET:
      return 'Local net'
    default: 
    return ''
  }
}
