import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { AppShell } from './app/AppShell'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AppShell>
      <App />
    </AppShell>
  </React.StrictMode>,
)
