import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './style.css'
import { HashRouter } from 'react-router-dom'
import { RouteProvider } from '@/providers/route-provider.tsx'
import { ThemeProvider } from '@/providers/theme-provider.tsx'
import { BackgroundProvider } from '@/providers/background-provider.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <HashRouter>
      <RouteProvider>
        <ThemeProvider>
          <BackgroundProvider>
            <App />
          </BackgroundProvider>
        </ThemeProvider>
      </RouteProvider>
    </HashRouter>
  </React.StrictMode>
)
