import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import { AuthProvider } from './context/AuthContext.jsx'
import { SiteDataProvider } from './context/SiteDataContext.jsx'
import './styles/index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <SiteDataProvider>
          <App />
        </SiteDataProvider>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>,
)
