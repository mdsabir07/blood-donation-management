import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router'
import { router } from './router/router.jsx'
import AuthProvider from './contexts/AuthContexts/AuthProvider.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <div className="font-urbanist">
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </div>
  </StrictMode>,
)
