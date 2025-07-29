import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter as Router } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { NotificationContextProvider } from './contexts/NotificationContext.jsx'
import { CurrentUserContextProvider } from './contexts/CurrentUserContext.jsx'

const queryClient = new QueryClient()

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <CurrentUserContextProvider>
        <NotificationContextProvider>
          <Router>
            <App />
          </Router>
        </NotificationContextProvider>
      </CurrentUserContextProvider>
    </QueryClientProvider>
  </StrictMode>,
)
