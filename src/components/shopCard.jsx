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
import { ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
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



function ShopCard({ product,health, timingJoker, fiftyLucky, token }) {
    const { name, price, quantity, image } = product;
    const [isConnected, setIsConnected] = useState(false);
    const [isWalletModalOpen, setIsWalletModalOpen] = useState(false);


   const wallet = localStorage.getItem('walletAddress');

   const { connection } = useConnection();
   const { publicKey, sendTransaction, signTransaction } = useWallet();

   

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
            alert("You can't buy tickets. Check your wallet.")
          } else {
            // Update state to reflect the new value
            
            alert("Game Ticket added your profile 🤙")
          }
        } catch (error) {
          console.error('Error updating user metadata:', error);
          alert("Something went wrong buying tickets.")
        }
      }

      const addTimingJoker = async (newTimingJoker) => {
        try {
          const { data, error } = await supabase.auth.updateUser({
            data: { timingJoker: newTimingJoker}
          })

          if (error) {
            console.error('Error updating user metadata:', error);
            alert("You can't buy tickets. Check your wallet.")
          } else {
            // Update state to reflect the new value
            alert("Timing Joker added your profile 🤙")
            console.log('User metadata updated successfully');
          }
        } catch (error) {
          console.error('Error updating user metadata:', error);
          alert("Something went wrong buying tickets.")
        }
      }

      const addFiftyChance = async (newFiftyChance) => {
        try {
          const { data, error } = await supabase.auth.updateUser({
            data: { fiftyPercentJoker: newFiftyChance }
          })

          if (error) {
            alert("You can't buy tickets. Check your wallet.")
            console.error('Error updating user metadata:', error);
          } else {
            // Update state to reflect the new value
            alert("Game Ticket added your profile 🤙")
            console.log('User metadata updated successfully');
          }
        } catch (error) {
          console.error('Error updating user metadata:', error);
          alert("Something went wrong buying tickets.")
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

      //In game token
      const onHandleBuySolanaGame = async () =>{
        let itemPrice;
        let quantitys;
        switch (name) {
            case 'Game Ticket':
                itemPrice = 0.12;
                quantitys = 1;
                handleBuyWithToken(itemPrice, quantitys)
                break;
            case 'Game Ticket x3':
                itemPrice = 0.3;
                quantitys = 3;
                handleBuyWithToken(itemPrice, quantitys)
                break;
            case 'Game Ticket x5':
                itemPrice = 0.5;
                quantitys = 5;
                handleBuyWithToken(itemPrice, quantitys)
                break;
            case 'Game Ticket x10':
                itemPrice = 0.7;
                quantitys = 10;
                handleBuyWithToken(itemPrice, quantitys)
                break;
            case 'Timing Joker':
                itemPrice = 0.07;
                quantitys = 1;
                handleBuyWithToken(itemPrice, quantitys)
                break;
            case 'Timing Joker x3':
                itemPrice = 0.15;
                quantitys = 3;
                handleBuyWithToken(itemPrice, quantitys)
                break;
            case 'Timing Joker x5':
                itemPrice = 0.2;
                quantitys = 5;
                handleBuyWithToken(itemPrice, quantitys)
                break;
            case 'Timing Joker x10':
                itemPrice = 0.3;
                quantitys = 10;
                handleBuyWithToken(itemPrice, quantitys)
                break;
            case 'Fifty Chance':
                itemPrice = 0.1;
                quantitys = 1;
                handleBuyWithToken(itemPrice, quantitys)
                break;
            case 'Fifty Chance x3':
                itemPrice = 0.27;
                quantitys = 3;
                handleBuyWithToken(itemPrice, quantitys)
                break;
            case 'Fifty Chance x5':
                itemPrice = 0.35;
                quantitys = 5;
                handleBuyWithToken(itemPrice, quantitys)
                break;
            case 'Fifty Chance x10':
                itemPrice = 0.5;
                quantitys = 10;
                handleBuyWithToken(itemPrice, quantitys)
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
           
            setIsWalletModalOpen(true)
        }
    }, [wallet, price, publicKey, sendTransaction, signTransaction, connection]);
    
    

    //in game token
    const handleBuyWithToken = useCallback(async (itemPrice, quantitys) => {
      try {
          if (token < itemPrice) {
              alert('You have not enough tokens to buy.');
              return;
          }
  
          const newToken = await token  - itemPrice;
    
      
          await supabase.auth.updateUser({
              data: { token: newToken },
          });
         
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
          console.error("error: ", error);
          console.log("error", error)
          setIsWalletModalOpen(true)
      }
  }, [ price]);
    
    
    
    

   

    return (
        <>
        
       
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
            <Stack direction={"row"} gap={1} sx={{ width: '100%' }}>
              <Button
                onClick={onHandleBuySolana}
                size="medium"
                sx={{
                  width: '50%',
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
                variant="outlined"
                onClick={onHandleBuySolanaGame}
                size="medium"
                sx={{
                  width: '50%',
                  borderColor: "#6949FD",
                  borderWidth: 2,
                  color: "#FEFEFE",
                  fontWeight: "bold",
                }}
              >
                Buy in Game {price} SOL
              </Button>
            </Stack>
            <WalletMultiButton />
            <WalletDisconnectButton />
          </Stack>
        </CardActions>
        </Card>
        </>
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
