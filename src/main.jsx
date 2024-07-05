import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { ToastContainer } from 'react-toastify'
import UserProvider from './Context/UserProvider.jsx'
ReactDOM.createRoot(document.getElementById('root')).render(
     <UserProvider >
         <App />
         <ToastContainer />
      </UserProvider>

  
  
)
