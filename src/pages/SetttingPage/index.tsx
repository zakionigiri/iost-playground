import React from 'react'
import Layout from '../../components/Layout'
import Notes from '../../components/Notes'
import LocaleSelect from '../../components/LocaleSelect'
import useStyles from './styles'

const SettingsPage = () => {
  const classes = useStyles()

  return (
    <Layout>
      <div className={classes.container}>
        <LocaleSelect />
        <Notes />
        <footer>©︎ AtsushiMiyazaki 2020- </footer>
      </div>
    </Layout>
  )
}

export default SettingsPage
