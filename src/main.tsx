import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.js'

createRoot(document.getElementById('root')!).render(
  <StrictMode> {/* el StrictMode es para que React nos avise de posibles problemas en la app */}
    <App />
  </StrictMode>,
)
