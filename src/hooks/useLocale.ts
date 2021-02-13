import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  changeSettings,
  allowedLocales,
} from '../store/features/settings/slices'
import { Locales, Lang } from '../store/features/settings/types'
import { selectSetting } from '../store/features/settings/selectors'
import ja from '../lib/locales/ja.json'
import en from '../lib/locales/en.json'
import util from 'util'

const messagesByLocal: Record<Locales, Lang> = {
  ['ja-JP']: ja,
  ['en-US']: en,
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

  const getLang = () => {
    const { lang } = messagesByLocal[locale]
    return lang
  }

  const getLocaleInfo = (locale: Locales) => {
    const { lang, name } = messagesByLocal[locale]
    return { lang, name }
  }

  const formatMessage = (id: string, ...str: string[]) => {
    const { messages } = messagesByLocal[locale]
    const message = util.format(
      messages[id as keyof typeof messages] || id,
      ...str
    )

    return message
  }

  return {
    locale,
    getLocaleInfo,
    formatMessage,
    changeLocale,
    getLang,
  }
}

export default useLocale
