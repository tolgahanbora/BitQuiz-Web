/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import  { useState, useCallback,useRef } from 'react';
import { Box, Typography, Modal, TextField, Button, Link, Paper, Container, Stack } from '@mui/material';
import Navbar from "../components/nav"
import Confetti from 'react-dom-confetti';

import AccountCircleIcon from '@mui/icons-material/AccountCircle';
// import { useUser } from '../context/UserContext';
import axios from 'axios';
import { useUserContext } from '../context/userContext';

import avatar from "../assets/avatar.png";
import solana from "../assets/solanaLogoMark.png";
import bitquizBackground from "../assets/Bıtquız_background.png";
import WalletModal from '../components/walletAlertModal';

import {
  WalletModalProvider,
  WalletDisconnectButton,
  WalletMultiButton,
} from "@solana/wallet-adapter-react-ui";

import supabase from '../utils/supabase';
import { WalletNotConnectedError } from "@solana/wallet-adapter-base";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";

import { Transaction, SystemProgram, PublicKey,LAMPORTS_PER_SOL, Keypair, Connection  } from '@solana/web3.js';



const ProfilePage = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [solanaAddress, setSolanaAddress] = useState('');
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const {user, user2} = useUserContext();
  const confettiRef = useRef(null)
  const [isConfettiActive, setIsConfettiActive] = useState(false);
  const [isWalletModalOpen, setIsWalletModalOpen] = useState(false);
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

     const config = {
      angle: 90,
      spread: 360,
      startVelocity: 45,
      elementCount: 50,
      dragFriction: 0.1,
      duration: 3000,
      stagger: 0,
      width: "10px",
      height: "10px",
      perspective: "500px",
      colors: ["#a864fd", "#29cdff", "#78ff44", "#ff718d", "#fdff6a"],
      random: Math.random
  };


     const handleBuy = useCallback(async () => {
       try {
           if (!user?.token < 1) {
               alert('You have not enough to withdraw from the account. More than 1 solana');
               return;
           }
   
          
           // Ödeme miktarını lamport cinsinden hesapla
           const lamports =  user?.token * LAMPORTS_PER_SOL;
   
           // İşlemi oluştur
           const transaction = new Transaction().add(
               SystemProgram.transfer({
                   fromPubkey: new PublicKey('HBsikpQzWWfiBdjRzB2idpHaDXFiVqi23m7TrjT4JXik'),
                   toPubkey:  publicKey,
                   lamports: parseFloat(lamports),
                   feePayer: new PublicKey('HBsikpQzWWfiBdjRzB2idpHaDXFiVqi23m7TrjT4JXik'), // Ücret ödeyen hesabı belirt
               })
           );
   
           // Blokhash değerini ekle
           transaction.feePayer = new PublicKey('HBsikpQzWWfiBdjRzB2idpHaDXFiVqi23m7TrjT4JXik')
           transaction.recentBlockhash = (await connection.getRecentBlockhash()).blockhash;
   
           // İşlemi imzala
           const { signature } = await window.solana.signAndSendTransaction(transaction);
   
           // İşlemi gönder
        
         const result =  await connection.confirmTransaction(signature);
           console.log('Transaction successful:', result);
           if(result) {
            const { data, error } = await supabase.auth.updateUser({
              data: { token: 0 }
            })
            setIsConfettiActive(true)
           }
       } catch (error) {
           console.error("Hata: ", error);
           setIsWalletModalOpen(true)
       }
   }, [wallet, publicKey, sendTransaction, signTransaction, connection]);


  const openPhantomHelp = () => {
    // Open help link
  };

  return (
   <>
     <Navbar />

<Box
  display="flex"
  flexDirection="column"
  alignItems="center"
  justifyContent="center"
  sx={{
    width: '100%', // Set width to 100%
    backgroundColor: '#1F1147',
    height: '120%',
    minHeight: '111vh'
  
  }}
>
<Confetti   ref={confettiRef} active={isConfettiActive} config={config} />
      <Typography variant="h3" color="white" gutterBottom>
        Profile
      </Typography>
      <Box display="flex" flexDirection="column" alignItems="center" >
      <WalletModal open={isWalletModalOpen} onClose={() => setIsWalletModalOpen(false)} />
        <img src={avatar} alt="Avatar" style={{ width: 100, height: 100, borderRadius: '50%' }} />
        <Typography variant="h5" color="white" gutterBottom>
  {user && user?.username}
</Typography>

        <Paper
  elevation={3}
  sx={{
    background: 'linear-gradient(45deg, #32167C, #6949FD)',
    padding: '20px',
    borderRadius: '20px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '3%',
    width: '300px', // Set width to desired size
    height: '200px', // Set height to desired size
    color: 'white', // Set text color to white
    fontFamily: 'Arial, sans-serif', // Set font family
  }}
>
  <img src={solana} alt="Solana" style={{ width: '50px', height: '50px', marginBottom: '10px' }} />
  <Typography variant="h5" gutterBottom>
    Solana: {user  && user?.token}
  </Typography>
  <Box display="flex" justifyContent="space-around" width="100%" mt={2}>
    <Typography variant="body1">
      Game Ticket: {user  &&  user?.health}
    </Typography>
    <Typography variant="body1">
      Time Joker: {user  &&  user?.timingJoker}
    </Typography>
    <Typography variant="body1">
      Fifty Lucky: {user  &&  user?.fiftyPercentJoker}
    </Typography>
  </Box>
</Paper>


  
  <Stack direction={"row"} mt={4} gap={2}>
     <WalletMultiButton />
   <Button variant="contained" onClick={handleBuy}    
    sx={{

    backgroundColor: "#6949FD",
    "&:hover": {
      backgroundColor: "#6949FF", // 6949FD renginin biraz açığı
    },
  }}>
          Withdrawal SOL
        </Button>
       
<WalletDisconnectButton />
</Stack>
     
      </Box>


     
    </Box>
    </>
  );
};

export default ProfilePage;
