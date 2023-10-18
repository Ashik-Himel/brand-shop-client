import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import { router } from './Router.jsx'
import './index.css'
import ContextProvider from './ContextProvider.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ContextProvider>
      <HelmetProvider>
        <RouterProvider router={router} />
      </HelmetProvider>
    </ContextProvider>
  </React.StrictMode>,
)
