import React from 'react'
import Layout from '../../components/Layout'
import Notes from '../../components/Notes'
import LocaleSelect from '../../components/LocaleSelect'

const SettingsPage = () => {
  return (
    <Layout>
      <>
        <LocaleSelect />
        <Notes />
        <footer>©︎ AtsushiMiyazaki 2020- </footer>
      </>
    </Layout>
  )
}

export default SettingsPage
