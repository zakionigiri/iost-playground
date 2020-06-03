import React from 'react'
import Layout from '../../components/Layout'
import { useIntl } from 'provider/IntlProvider'

const SettingsPage = () => {
  const { langSelect } = useIntl()

  return <Layout>{langSelect()}</Layout>
}

export default SettingsPage
