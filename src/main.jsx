import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import App from './App'
import Portfolio from './unusual'
import Apps from './Apps'
import WordPuzzleGame from './games/WordConnect/WordPuzzle'
import WordConnectMobile from './games/WordConnect/WordConnectMobile'
import './index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Portfolio />

    {/* <App /> */}
    {/* <WordPuzzleGame/> */}
  </StrictMode>
)
