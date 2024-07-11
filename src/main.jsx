/* eslint-disable no-unused-vars */
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { UserContextProvider } from './context/userContext'
import {
    ConnectionProvider,
    WalletProvider,
} from "@solana/wallet-adapter-react";
import { UnsafeBurnerWalletAdapter } from "@solana/wallet-adapter-wallets";
import {
    WalletModalProvider,
    WalletDisconnectButton,
    WalletMultiButton,
} from "@solana/wallet-adapter-react-ui";
import './index.css'
import "@solana/wallet-adapter-react-ui/styles.css"

// Özel RPC endpoint'inizi burada tanımlayın
const endpoint = "https://frosty-dimensional-surf.solana-mainnet.quiknode.pro/e339f3748c13eda169987da83f64b09503686a71/";

const wallets = [
    new UnsafeBurnerWalletAdapter(),
];

ReactDOM.createRoot(document.getElementById('root')).render(
    <ConnectionProvider endpoint={endpoint}>
        <WalletProvider wallets={wallets} autoConnect>
            <WalletModalProvider>
                <UserContextProvider>
                    <App />
                </UserContextProvider>
            </WalletModalProvider>
        </WalletProvider>
    </ConnectionProvider>
)