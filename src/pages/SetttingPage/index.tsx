import React from 'react'
import Layout from '../../components/Layout'
import { useIntl } from 'provider/IntlProvider'
import Notes from 'components/Notes'

const SettingsPage = () => {
  const { langSelect } = useIntl()

  return (
    <Layout>
      <>
        <div>{langSelect()}</div>
        <Notes />
        <footer>©︎ AtsushiMiyazaki 2020- </footer>
      </>
    </Layout>
  )
}

export default SettingsPage
