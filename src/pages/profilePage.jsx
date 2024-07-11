/* eslint-disable no-unused-vars */
import React, { useState, useCallback, useRef } from 'react';
import { Box, Typography, Modal, TextField, Button, Link, Paper, Container, Stack } from '@mui/material';
import Navbar from "../components/nav"
import Confetti from 'react-dom-confetti';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
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
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { Transaction, SystemProgram, PublicKey, LAMPORTS_PER_SOL, Keypair, Connection } from '@solana/web3.js';

const ProfilePage = () => {
  const [isConfettiActive, setIsConfettiActive] = useState(false);
  const [isWalletModalOpen, setIsWalletModalOpen] = useState(false);
  const { user } = useUserContext();
  const confettiRef = useRef(null);

  const { connection } = useConnection();
  const { publicKey, sendTransaction } = useWallet();

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
    colors: ["#a864fd", "#29cdff", "#78ff44", "#ff718d", "#fdff6a"]
  };

  const handleBuy = useCallback(async () => {
    if (!publicKey) {
      alert('Please connect your wallet first.');
      return;
    }

    if (!user || typeof user.token !== 'number' || user.token <= 1) {
      alert('You need more than 1 token to withdraw.');
      return;
    }

    try {
      const lamports = Math.floor(user.token * LAMPORTS_PER_SOL);

      const transaction = new Transaction().add(
        SystemProgram.transfer({
          fromPubkey: new PublicKey('HBsikpQzWWfiBdjRzB2idpHaDXFiVqi23m7TrjT4JXik'),
          toPubkey: publicKey,
          lamports: lamports,
        })
      );

      const { blockhash } = await connection.getRecentBlockhash();
      transaction.recentBlockhash = blockhash;
      transaction.feePayer = publicKey;

      const signature = await sendTransaction(transaction, connection);
      const result = await connection.confirmTransaction(signature, 'confirmed');

      if (result.value.err === null) {
        const { data, error } = await supabase.auth.updateUser({
          data: { token: 0 }
        });

        if (error) {
          console.error("Error updating user data:", error);
        } else {
          setIsConfettiActive(true);
          alert('Withdrawal successful!');
        }
      } else {
        console.error("Transaction failed:", result.value.err);
        alert('Transaction failed. Please try again.');
      }
    } catch (error) {
      console.error("Error:", error);
      setIsWalletModalOpen(true);
    }
  }, [publicKey, user, connection, sendTransaction]);

  return (
    <>
      <Navbar />
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        sx={{
          width: '100%',
          backgroundColor: '#1F1147',
          minHeight: '111vh'
        }}
      >
        <Confetti ref={confettiRef} active={isConfettiActive} config={config} />
        <Typography variant="h3" color="white" gutterBottom>
          Profile
        </Typography>
        <Box display="flex" flexDirection="column" alignItems="center">
          <WalletModal open={isWalletModalOpen} onClose={() => setIsWalletModalOpen(false)} />
          <img src={avatar} alt="Avatar" style={{ width: 100, height: 100, borderRadius: '50%' }} />
          <Typography variant="h5" color="white" gutterBottom>
            {user?.username}
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
              width: '300px',
              height: '200px',
              color: 'white',
              fontFamily: 'Arial, sans-serif',
            }}
          >
            <img src={solana} alt="Solana" style={{ width: '50px', height: '50px', marginBottom: '10px' }} />
            <Typography variant="h5" gutterBottom>
              Solana: {user?.token || 0}
            </Typography>
            <Box display="flex" justifyContent="space-around" width="100%" mt={2}>
              <Typography variant="body1">
                Game Ticket: {user?.health || 0}
              </Typography>
              <Typography variant="body1">
                Time Joker: {user?.timingJoker || 0}
              </Typography>
              <Typography variant="body1">
                Fifty Lucky: {user?.fiftyPercentJoker || 0}
              </Typography>
            </Box>
          </Paper>

          <Stack direction="row" mt={4} gap={2}>
            <WalletMultiButton />
            <Button 
              variant="contained" 
              onClick={handleBuy}
              sx={{
                backgroundColor: "#6949FD",
                "&:hover": {
                  backgroundColor: "#6949FF",
                },
              }}
            >
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