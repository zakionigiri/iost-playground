import React, { useContext, useEffect, createContext, useState } from 'react'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import useStyles from './styles'

import ja from '../lib/locales/ja.json'
import en from '../lib/locales/en.json'

const locales = { ja, en }
const defaultLang = 'en'

type Locales = 'ja' | 'en'
type IntlValues = {
  lang: Locales
  langSelect: () => JSX.Element
  formatMessage: (id: string) => string
}

const isValidLang = (lang: string): boolean =>
  Object.keys(locales).includes(lang)

const intlContext = createContext<IntlValues>({
  lang: defaultLang,
  langSelect: () => <div></div>,
  formatMessage: id => id
})

const IntlProvider: React.FC = ({ children }) => {
  const classes = useStyles()
  const [lang, setLang] = useState<IntlValues['lang']>(defaultLang)

  useEffect(() => {
    const presetLang = window.localStorage.getItem('iost_playground_locale')

    if (presetLang == null) {
      setLang(defaultLang)
      return
    }

    if (isValidLang(presetLang) === false) {
      window.localStorage.setItem('iost_playground_locale', defaultLang)
      setLang(defaultLang)
      return
    }

    setLang(presetLang as Locales)
  }, [])

  const handleLangChange = (
    event: React.ChangeEvent<{
      _?: string | undefined
      value: unknown
    }>
  ) => {
    if (typeof event.target.value !== 'string') {
      return
    }

    window.localStorage.setItem(
      'iost_playground_locale',
      event.target.value as string
    )
    setLang(event.target.value as Locales)
  }

  const langSelect = () => (
    <>
      <h2 className={classes.title}>{formatMessage('language')}</h2>
      <Select
        onChange={handleLangChange}
        className={classes.hostSelect}
        value={lang}
      >
        {Object.keys(locales).map(key => {
          const { lang, name } = locales[key as Locales]
          return <MenuItem value={lang}>{name}</MenuItem>
        })}
      </Select>
    </>
  )

  const formatMessage = (id: string) => {
    const messages = locales[lang].messages as { [key: string]: string }
    const message = messages[id]

    return message || id
  }

  const value: IntlValues = {
    lang,
    langSelect,
    formatMessage
  }

  return <intlContext.Provider value={value}>{children}</intlContext.Provider>
}

export const useIntl = () => useContext<IntlValues>(intlContext)
export default IntlProvider
