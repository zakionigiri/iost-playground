import React from 'react'
import './App.css'
import Layout from './components/Layout'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import AccountPage from './pages/AccountPage'
import AccountProvider from './provider/AccountProvider'

const App = () => {
  return (
    <Router>
      <AccountProvider>
        <Layout>
          <Route exact path="/account" component={AccountPage} />
        </Layout>
      </AccountProvider>
    </Router>
  )
}

export default App
