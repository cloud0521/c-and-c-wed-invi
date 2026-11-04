import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { WeddingExperienceProvider } from './contexts/WeddingExperienceContext'
import { cloydCyrinWedding } from './data/weddings/cloyd-cyrin'
import './styles.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <WeddingExperienceProvider experience={cloydCyrinWedding}>
      <App />
    </WeddingExperienceProvider>
  </React.StrictMode>,
)
