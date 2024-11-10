import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'



import Portfolio from './uuu'
import './index.css'
import GemQuest from './gem'
import App from './Apps'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
)
