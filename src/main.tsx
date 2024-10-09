import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { FavoritesProvider } from './contexts/FavoritesContext'
import App from './App'
import './index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <FavoritesProvider>
      <App />
    </FavoritesProvider>
  </StrictMode>,
)