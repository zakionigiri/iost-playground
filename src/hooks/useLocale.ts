import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  changeSettings,
  allowedLocales
} from '../store/features/settings/slices'
import { Locales, Lang } from '../store/features/settings/types'
import { selectSetting } from '../store/features/settings/selectors'
import ja from '../lib/locales/ja.json'
import en from '../lib/locales/en.json'

const messagesByLocal: Record<Locales, Lang> = {
  ['ja-JP']: ja,
  ['en-US']: en
}

const isValidLocale = (locale: string): locale is Locales =>
  allowedLocales.includes(locale as Locales)

const useLocale = () => {
  const dispatch = useDispatch()
  const locale = useSelector(selectSetting('locale'))

  useEffect(() => {
    const presetLocale =
      window.localStorage.getItem('IOST_playground_locale') || ''

    if (isValidLocale(presetLocale)) {
      dispatch(changeSettings({ locale: presetLocale }))
    }
  }, [])

  const changeLocale = (locale: Locales) => {
    if (isValidLocale(locale)) {
      window.localStorage.setItem('IOST_playground_locale', locale)
      dispatch(changeSettings({ locale }))
    }
  }

  const getLocaleInfo = (locale: Locales) => {
    const { lang, name } = messagesByLocal[locale]
    return { lang, name }
  }

  const formatMessage = (id: string, ...str: string[]) => {
    const { messages } = messagesByLocal[locale]
    let message = messages[id as keyof typeof messages] || id
    let num = 0

    while (message.includes('%s') && num < 1000) {
      message = message.replace(/%s/, str[num] || '')
      num++
    }

    return message
  }

  return {
    locale,
    getLocaleInfo,
    formatMessage,
    changeLocale
  }
}

export default useLocale
