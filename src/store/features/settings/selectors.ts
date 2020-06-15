import { SettingsState } from './types'
import { RootState } from 'store'

export const selectSetting = <T extends keyof SettingsState>(type: T) => (
  state: RootState
): SettingsState[T] => state.settings[type]

export const selectSettingsState = (state: RootState) => state.settings
