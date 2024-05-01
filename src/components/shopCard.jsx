/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useCallback,useState } from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import {
  
    WalletDisconnectButton,
    WalletMultiButton,
  } from "@solana/wallet-adapter-react-ui";
import WalletModal from './walletAlertModal';
import supabase from '../utils/supabase';
import { WalletNotConnectedError } from "@solana/wallet-adapter-base";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";

import PropTypes from 'prop-types';

import { usePicket } from "@picketapi/picket-react";
import { Transaction, SystemProgram, PublicKey,LAMPORTS_PER_SOL, Keypair, Connection  } from '@solana/web3.js';
import { Stack } from '@mui/material';



function ShopCard({ product,health, timingJoker, fiftyLucky }) {
    const { name, price, quantity, image } = product;
    const [isConnected, setIsConnected] = useState(false);
    const [isWalletModalOpen, setIsWalletModalOpen] = useState(false);


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

      const handleOpenWalletModal = () => {
        setIsWalletModalOpen(true);
      };

      const handleClose = () => {
        setIsWalletModalOpen(true);
      };

      const addTicket = async (newTicket) => {
        try {
          const { data, error } = await supabase.auth.updateUser({
            data: { health: newTicket }
          })

          if (error) {
            console.error('Error updating user metadata:', error);
          } else {
            // Update state to reflect the new value

            console.log('User metadata updated successfully');
          }
        } catch (error) {
          console.error('Error updating user metadata:', error);
        }
      }

      const addTimingJoker = async (newTimingJoker) => {
        try {
          const { data, error } = await supabase.auth.updateUser({
            data: { health: newTimingJoker}
          })

          if (error) {
            console.error('Error updating user metadata:', error);
          } else {
            // Update state to reflect the new value

            console.log('User metadata updated successfully');
          }
        } catch (error) {
          console.error('Error updating user metadata:', error);
        }
      }

      const addFiftyChance = async (newFiftyChance) => {
        try {
          const { data, error } = await supabase.auth.updateUser({
            data: { health: newFiftyChance }
          })

          if (error) {
            console.error('Error updating user metadata:', error);
          } else {
            // Update state to reflect the new value

            console.log('User metadata updated successfully');
          }
        } catch (error) {
          console.error('Error updating user metadata:', error);
        }
      }


      const onHandleBuySolana = async () =>{
        let itemPrice;
        let quantitys;
        switch (name) {
            case 'Game Ticket':
                itemPrice = 0.12;
                quantitys = 1;
                handleBuy(itemPrice, quantitys)
                break;
            case 'Game Ticket x3':
                itemPrice = 0.3;
                quantitys = 3;
                handleBuy(itemPrice, quantitys)
                break;
            case 'Game Ticket x5':
                itemPrice = 0.5;
                quantitys = 5;
                handleBuy(itemPrice, quantitys)
                break;
            case 'Game Ticket x10':
                itemPrice = 0.7;
                quantitys = 10;
                handleBuy(itemPrice, quantitys)
                break;
            case 'Timing Joker':
                itemPrice = 0.07;
                quantitys = 1;
                handleBuy(itemPrice, quantitys)
                break;
            case 'Timing Joker x3':
                itemPrice = 0.15;
                quantitys = 3;
                handleBuy(itemPrice, quantitys)
                break;
            case 'Timing Joker x5':
                itemPrice = 0.2;
                quantitys = 5;
                handleBuy(itemPrice, quantitys)
                break;
            case 'Timing Joker x10':
                itemPrice = 0.3;
                quantitys = 10;
                handleBuy(itemPrice, quantitys)
                break;
            case 'Fifty Chance':
                itemPrice = 0.1;
                quantitys = 1;
                handleBuy(itemPrice, quantitys)
                break;
            case 'Fifty Chance x3':
                itemPrice = 0.27;
                quantitys = 3;
                handleBuy(itemPrice, quantitys)
                break;
            case 'Fifty Chance x5':
                itemPrice = 0.35;
                quantitys = 5;
                handleBuy(itemPrice, quantitys)
                break;
            case 'Fifty Chance x10':
                itemPrice = 0.5;
                quantitys = 10;
                handleBuy(itemPrice, quantitys)
                break;
            default:
                console.error('Bilinmeyen ürün:', name);
                return;
        }
      }


      const handleBuy = useCallback(async (itemPrice, quantitys) => {
        try {
            if (!connection) {
                console.error('Cüzdan bağlı değil');
                return;
            }
    
            console.log()
    
            // Ödeme miktarını lamport cinsinden hesapla
            const lamports = itemPrice * LAMPORTS_PER_SOL;
    
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
              // Satın alma işlemi başarılıysa ilgili ürünü kullanıcıya ekle
        switch (name) {
          case 'Game Ticket':
              addTicket(health + quantitys);
              break;
          case 'Game Ticket x3':
              addTicket(health + quantitys);
              break;
          case 'Game Ticket x5':
              addTicket(health + quantitys);
              break;
          case 'Game Ticket x10':
              addTicket(health + quantitys);
              break;
          case 'Timing Joker':
              addTimingJoker(timingJoker + quantitys);
              break;
          case 'Timing Joker x3':
              addTimingJoker(timingJoker + quantitys);
              break;
          case 'Timing Joker x5':
              addTimingJoker(timingJoker + quantitys);
              break;
          case 'Timing Joker x10':
              addTimingJoker(timingJoker + quantitys);
              break;
          case 'Fifty Chance':
              addFiftyChance(fiftyLucky + quantitys);
              break;
          case 'Fifty Chance x3':
              addFiftyChance(fiftyLucky + quantitys);
              break;
          case 'Fifty Chance x5':
              addFiftyChance(fiftyLucky + quantitys);
              break;
          case 'Fifty Chance x10':
              addFiftyChance(fiftyLucky + quantitys);
              break;
          default:
              console.error('Bilinmeyen ürün:', name);
              break;
      }
        } catch (error) {
            console.error("Hata: ", error);
            console.log("errordur bu", error)
            setIsWalletModalOpen(true)
        }
    }, [wallet, price, publicKey, sendTransaction, signTransaction, connection]);
    
    
    
    
    
    

   

    return (
        <Card sx={{ maxWidth: 345, backgroundColor: "#311C7F", borderRadius: 5 }}>
          <WalletModal open={isWalletModalOpen} onClose={() => setIsWalletModalOpen(false)} />
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
                    <Stack direction={"column"} gap={1}>
                    <Stack direction={"row"} gap={1}>
                      <Button
                        onClick={onHandleBuySolana}
                        size="large"
                        fullWidth
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
                    Buy {price}$SOL
                    </Button>
                    <Button
                        onClick={onHandleBuySolana}
                        size="large"
                        fullWidth
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
                    Buy {price}$SOL
                    </Button>
                    </Stack>
                   <WalletMultiButton />
                    <WalletDisconnectButton /></Stack>
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
