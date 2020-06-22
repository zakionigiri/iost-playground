import React from 'react'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import useStyles from './styles'
import useLocale from '../../hooks/useLocale'
import { Locales } from 'store/features/settings/types'
import { allowedLocales } from 'store/features/settings/slices'

const LocaleSelect = () => {
  const classes = useStyles()
  const { locale, getLocaleInfo, changeLocale, formatMessage } = useLocale()

  const handleChange = (
    e: React.ChangeEvent<{
      name?: string | undefined
      value: unknown
    }>
  ) => {
    changeLocale(e.target.value as Locales)
  }

  return (
    <>
      <h2 className={classes.title}>{formatMessage('language')}</h2>
      <Select
        onChange={handleChange}
        className={classes.hostSelect}
        value={locale}
      >
        {allowedLocales.map(key => {
          const { name } = getLocaleInfo(key)
          return <MenuItem value={key}>{name}</MenuItem>
        })}
      </Select>
    </>
  )
}

export default LocaleSelect
