export type SettingsState = {
  locale: Locales
  compile: {
    showConfirmation: boolean
  }
  rpcHost: string
}

export type Lang = {
  name: string
  lang: string
  messages: {
    [key: string]: string
  }
}

export type Locales = 'ja-JP' | 'en-US'

export type SettingsPayload = Partial<SettingsState>
