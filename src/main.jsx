/* eslint-disable no-unused-vars */
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { UserContextProvider } from './context/userContext'
import {
    ConnectionProvider,
    WalletProvider,
  } from "@solana/wallet-adapter-react";
  import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
  import { UnsafeBurnerWalletAdapter } from "@solana/wallet-adapter-wallets";
  import {
    WalletModalProvider,
    WalletDisconnectButton,
    WalletMultiButton,
  } from "@solana/wallet-adapter-react-ui";
  import { clusterApiUrl } from "@solana/web3.js";
import './index.css'
import "@solana/wallet-adapter-react-ui/styles.css"

const network = WalletAdapterNetwork.Devnet;

// You can also provide a custom RPC endpoint.
const endpoint = clusterApiUrl(network);

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
