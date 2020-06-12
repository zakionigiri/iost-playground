import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import * as serviceWorker from './serviceWorker'
import { Provider } from 'react-redux'
import store from './state/store'

document.addEventListener(
  'keydown',
  e => {
    if (
      e.keyCode == 83 &&
      (navigator.platform.match('Mac') ? e.metaKey : e.ctrlKey)
    ) {
      e.preventDefault()
      console.log('Save command is disabled')
      console.log(
        "Code changes are automatically saved to browser's Web storage"
      )
    }
  },
  false
)

document.addEventListener('contextmenu', e => {
  e.preventDefault()
})

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
)

serviceWorker.unregister()
