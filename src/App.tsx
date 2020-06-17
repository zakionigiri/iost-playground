import React, { useEffect } from 'react'
import './App.css'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import AccountPage from './pages/AccountPage'
import GlobalCss from './GlobalCss'
import ApiPage from './pages/ApiPage'
import ContractsPage from './pages/ContractsPage'
import SettingsPage from './pages/SetttingPage'
import Notifications from './components/Notifications'
import { useDispatch, useSelector } from 'react-redux'
import { initializeStart } from './store/features/iost/slices'
import { initializeDB } from 'store/features/db/slices'
import { DB_NAME, dbOptions } from 'store/features/db/config'
import PouchDB from 'pouchdb'
import { initializeContractStateStart } from 'store/features/contract/slices'
import Dialog from './components/Dialog'
import { getContractState } from 'store/features/contract/selectors'
import useSaveCode from 'hooks/useSaveCode'
import { ThemeProvider } from '@material-ui/core'
import theme from './lib/theme'

const App = () => {
  const dispatch = useDispatch()
  const { isSaved } = useSelector(getContractState)
  useSaveCode()

  const handleLoad = () => {
    const db = new PouchDB(DB_NAME, dbOptions)
    dispatch(initializeDB(db))
    dispatch(initializeStart({ iwallet: window.IWalletJS }))
    dispatch(initializeContractStateStart(db))
  }

  const handleBeforeUnload = (e: BeforeUnloadEvent) => {
    e.returnValue = 'hello'
  }

  useEffect(() => {
    window.addEventListener('load', handleLoad)

    if (isSaved === false) {
      window.addEventListener('beforeunload', handleBeforeUnload)
    } else {
      window.removeEventListener('beforeunload', handleBeforeUnload)
    }

    return () => {
      window.removeEventListener('load', handleLoad)
      window.removeEventListener('beforeunload', handleBeforeUnload)
    }
  }, [isSaved])

  return (
    <Router>
      <ThemeProvider theme={theme}>
        <Notifications />
        <Dialog />
        <GlobalCss />
        <Route exact path="/" component={ContractsPage} />
        <Route exact path="/account" component={AccountPage} />
        <Route exact path="/api" component={ApiPage} />
        <Route exact path="/settings" component={SettingsPage} />
      </ThemeProvider>
    </Router>
  )
}

export default App
