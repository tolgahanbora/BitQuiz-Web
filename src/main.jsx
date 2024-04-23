/* eslint-disable no-unused-vars */
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { UserContextProvider } from './context/userContext'
import { WalletModalProvider } from '@solana/wallet-adapter-react-ui';
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(

     <UserContextProvider>
        <WalletModalProvider>
    <App />
    </WalletModalProvider>
    </UserContextProvider>

)
