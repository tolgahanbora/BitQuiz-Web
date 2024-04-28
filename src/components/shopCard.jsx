/* eslint-disable no-unused-vars */
import React, { useCallback,useState } from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import {
    WalletModalProvider,
    WalletDisconnectButton,
    WalletMultiButton,
  } from "@solana/wallet-adapter-react-ui";
  
import supabase from '../utils/supabase';
import { WalletNotConnectedError } from "@solana/wallet-adapter-base";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";

import PropTypes from 'prop-types';

import { usePicket } from "@picketapi/picket-react";
import { Transaction, SystemProgram, PublicKey,LAMPORTS_PER_SOL, Keypair, Connection  } from '@solana/web3.js';



function ShopCard({ product }) {
    const { name, price, quantity, image } = product;
    const [isConnected, setIsConnected] = useState(false);

   const wallet = localStorage.getItem('walletAddress');

   const { connection } = useConnection();
   const { publicKey, sendTransaction, signTransaction } = useWallet();

    const connectWallet = async () => {
        if (window.solana && window.solana.isPhantom) {
          try {
            await window.solana.connect();
            setIsConnected(true);
    
            // Cüzdan bağlandıktan sonra yapılacak işlemleri burada gerçekleştirebilirsiniz
            const { publicKey } = window.solana;
            if (publicKey) {
              localStorage.setItem('walletAddress', publicKey.toBase58());
            }
          } catch (error) {
            console.error("Phantom cüzdanına bağlanırken bir hata oluştu:", error);
          }
        } else {
          console.error(
            "Phantom cüzdanı yüklü değil veya tarayıcınız tarafından desteklenmiyor."
          );
        }
      };


      const handleBuy = useCallback(async () => {
        try {
            if (!wallet) {
                console.error('Cüzdan bağlı değil');
                return;
            }
    
            
    
            // Ödeme miktarını lamport cinsinden hesapla
            const lamports = price * LAMPORTS_PER_SOL;
    
            // İşlemi oluştur
            const transaction = new Transaction().add(
                SystemProgram.transfer({
                    fromPubkey: publicKey,
                    toPubkey: new PublicKey('EyoPNUAmEgGh1jnvZYMa2y3cXk8qYFjjPNotrtSY3dUm'),
                    lamports: lamports,
                    feePayer: publicKey, // Ücret ödeyen hesabı belirt
                })
            );
    
            // Blokhash değerini ekle
            transaction.feePayer = publicKey
            transaction.recentBlockhash = (await connection.getRecentBlockhash()).blockhash;
    
            // İşlemi imzala
            const { signature } = await window.solana.signAndSendTransaction(transaction);
    
            // İşlemi gönder
         
          const result =  await connection.confirmTransaction(signature);
            console.log('Transaction successful:', result);
        } catch (error) {
            console.error("Hata: ", error);
        }
    }, [wallet, price, publicKey, sendTransaction, signTransaction, connection]);
    
    
    
    
    
    

   

    return (
        <Card sx={{ maxWidth: 345, backgroundColor: "#311C7F", borderRadius: 5 }}>
            <CardMedia
                sx={{ height: 170 }}
                image={image}
                title="shop images"
            />

            <CardContent>
                <Typography gutterBottom variant="h5" component="div" style={{ color: "#FEFEFE" }}>
                    {name}
                </Typography>
            </CardContent>

            <CardActions sx={{ display: 'flex', justifyContent: 'center' }}>
                <Typography variant="body2" color="text.secondary" sx={{ marginRight: 'auto', marginLeft: '20px', color: "#FEFEFE" }}>
                    Price: $SOL {price}
                </Typography>

                {!wallet && (
                    <Button
                        size="large"
                        onClick={connectWallet}
                        sx={{
                            marginLeft: 'auto',
                            marginRight: '20px',
                            backgroundColor: "#6949FD",
                            color: "#FEFEFE",
                            fontWeight: "bold",
                            '&:hover': {
                                backgroundColor: '#7E64FF',
                            },
                        }}
                    >
                        Login with Wallet
                    </Button>
                )}

                {wallet && (
                    <><Button
                        onClick={handleBuy}
                        size="large"
                        sx={{
                            marginLeft: 'auto',
                            marginRight: '20px',
                            backgroundColor: "#6949FD",
                            color: "#FEFEFE",
                            fontWeight: "bold",
                            '&:hover': {
                                backgroundColor: '#7E64FF',
                            },
                        }}
                    >
                        Buy
                    </Button>
                    <WalletMultiButton />
                    <WalletDisconnectButton /></>
         
                )}
            </CardActions>
        </Card>
    );
}


ShopCard.propTypes = {
    product: PropTypes.shape({
        name: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired,
        quantity: PropTypes.number.isRequired,
        image: PropTypes.string.isRequired
    }).isRequired
};

export default ShopCard;
