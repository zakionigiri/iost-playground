import React, { useEffect } from 'react'
import './App.css'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import AccountPage from './pages/AccountPage'
import GlobalCss from './GlobalCss'
import ApiPage from './pages/ApiPage'
import ContractsPage from './pages/ContractsPage'
import SettingsPage from './pages/SetttingPage'
import IntlProvider from 'provider/IntlProvider'
import NotificationProvider from './provider/NotificationProvider'
import { useDispatch } from 'react-redux'
import { initializeStart } from './state/features/iost/slices'
import { initializeDB } from 'state/features/db/slices'
import { DB_NAME, dbOptions } from 'state/features/db/config'
import PouchDB from 'pouchdb'
import { initializeContractStateStart } from 'state/features/contract/slices'

const App = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    window.addEventListener('load', () => {
      const db = new PouchDB(DB_NAME, dbOptions)
      dispatch(initializeDB(db))
      dispatch(initializeStart({ iwallet: window.IWalletJS }))
      dispatch(initializeContractStateStart(db))
    })
  }, [])

  return (
    <Router>
      <IntlProvider>
        <NotificationProvider>
          <GlobalCss />
          <Route exact path="/" component={ContractsPage} />
          <Route exact path="/account" component={AccountPage} />
          <Route exact path="/api" component={ApiPage} />
          <Route exact path="/settings" component={SettingsPage} />
        </NotificationProvider>
      </IntlProvider>
    </Router>
  )
}

export default App
