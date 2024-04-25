/* eslint-disable no-unused-vars */
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { UserContextProvider } from './context/userContext'
import { PicketProvider } from "@picketapi/picket-react"
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
    <PicketProvider apiKey='pk_51ebf9bb0673e09f70763c0790d41a87'>
     <UserContextProvider>
       
    <App />
 
    </UserContextProvider>
    </PicketProvider>
)
