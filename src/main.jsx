import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import {HashRouter} from 'react-router-dom'
import {CookiesProvider} from 'react-cookie'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <HashRouter>
      <CookiesProvider>
    <App />
    </CookiesProvider>
    </HashRouter>
  </React.StrictMode>
)
