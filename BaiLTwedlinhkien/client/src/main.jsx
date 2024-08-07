import React from 'react'
import ReactDOM from 'react-dom/client'
import './main.css'
import "./Css/custom.css"
import App from './App.jsx'
import { CountProvider } from './Context/CountContext.jsx'
import { ToastContainer } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <CountProvider>
      <App />
      <ToastContainer position='top-right' />
    </CountProvider>
  </React.StrictMode>,
)
