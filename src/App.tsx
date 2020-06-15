import React, { useEffect } from 'react'
import './App.css'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import AccountPage from './pages/AccountPage'
import GlobalCss from './GlobalCss'
import ApiPage from './pages/ApiPage'
import ContractsPage from './pages/ContractsPage'
import SettingsPage from './pages/SetttingPage'
import Notifications from './components/Notifications'
import { useDispatch } from 'react-redux'
import { initializeStart } from './store/features/iost/slices'
import { initializeDB } from 'store/features/db/slices'
import { DB_NAME, dbOptions } from 'store/features/db/config'
import PouchDB from 'pouchdb'
import { initializeContractStateStart } from 'store/features/contract/slices'
import Dialog from './components/Dialog'

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
      <Notifications />
      <Dialog />
      <GlobalCss />
      <Route exact path="/" component={ContractsPage} />
      <Route exact path="/account" component={AccountPage} />
      <Route exact path="/api" component={ApiPage} />
      <Route exact path="/settings" component={SettingsPage} />
    </Router>
  )
}

export default App
