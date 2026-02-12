import React from 'react'

import ReactDOM from 'react-dom/client'
import { HashRouter } from 'react-router-dom'

import App from '@/entrypoints/popup/App'
import { BackgroundProvider } from '@/providers/background-provider.tsx'
import { RouteProvider } from '@/providers/route-provider.tsx'
import { ThemeProvider } from '@/providers/theme-provider.tsx'
import '@/entrypoints/popup/style.css'

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
