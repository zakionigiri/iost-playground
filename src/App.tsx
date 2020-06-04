import React from 'react'
import './App.css'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import AccountPage from './pages/AccountPage'
import AccountProvider from './provider/AccountProvider'
import GlobalCss from './GlobalCss'
import ApiPage from './pages/ApiPage'
import ContractsPage from './pages/ContractsPage'
import SettingsPage from './pages/SetttingPage'
import IntlProvider from 'provider/IntlProvider'
import SnackbarProvider from 'provider/SnackbarProvider'

const App = () => {
  return (
    <Router>
      <IntlProvider>
        <SnackbarProvider>
          <AccountProvider>
            <GlobalCss />
            <Route exact path="/" component={ContractsPage} />
            <Route exact path="/account" component={AccountPage} />
            <Route exact path="/api" component={ApiPage} />
            <Route exact path="/settings" component={SettingsPage} />
          </AccountProvider>
        </SnackbarProvider>
      </IntlProvider>
    </Router>
  )
}

export default App
