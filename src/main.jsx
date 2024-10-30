import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'



import Portfolio from './uuu'
import './index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Portfolio />

    {/* <App /> */}
    {/* <WordPuzzleGame/> */}
  </StrictMode>
)
