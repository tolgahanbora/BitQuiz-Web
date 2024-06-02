/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { Connection, PublicKey } from '@solana/web3.js';
import { TOKEN_PROGRAM_ID } from '@solana/spl-token';
import { Buffer } from 'buffer';
import { Typography, Button, Box } from '@mui/material';
import Navbar from '../components/nav';
import { useNavigate } from 'react-router-dom';
import TicketIcon from '@mui/icons-material/ConfirmationNumber';
import { useUserContext } from '../context/userContext';
import supabase from '../utils/supabase';

const SOLANA_NETWORK = 'https://frosty-dimensional-surf.solana-mainnet.quiknode.pro/e339f3748c13eda169987da83f64b09503686a71/';
const BONK_MINT_ADDRESS = 'DezXAZ8z7PnrnRJjz3wXBoRgixCa6xjnB7YaB1pPB263';

function PlayPage() {
  const navigate = useNavigate();
  const { user, user2 } = useUserContext();
  const [ticket, setTicket] = useState();
  const [walletAddress, setWalletAddress] = useState(null);
  const [bonkBalance, setBonkBalance] = useState(null);
  const [error, setError] = useState(null);

  const userTickets = user?.health;
  const getTicketDate = user?.getTicketDate;

  const connectWallet = async () => {
    if (window.solana) {
      try {
        const response = await window.solana.connect();
        setWalletAddress(response.publicKey.toString());
      } catch (err) {
        console.error(err);
        setError('Failed to connect wallet');
      }
    } else {
      alert('Solana wallet not found. Please install Phantom.');
    }
  };

  const fetchBonkBalance = async (publicKey) => {
    try {
      const connection = new Connection(SOLANA_NETWORK);
      const tokenAccounts = await connection.getParsedTokenAccountsByOwner(
        new PublicKey(publicKey),
        { programId: TOKEN_PROGRAM_ID }
      );

      if (tokenAccounts.value.length === 0) {
        setError('No token accounts found for this wallet.');
        setBonkBalance(null);
        return;
      }

      const bonkTokenAccount = tokenAccounts.value.find(
        (tokenAccount) => tokenAccount.account.data.parsed.info.mint === BONK_MINT_ADDRESS
      );

      if (!bonkTokenAccount) {
        setError('No BONK token accounts found for this wallet.');
        setBonkBalance(null);
        return;
      }

      const balance = await connection.getTokenAccountBalance(new PublicKey(bonkTokenAccount.pubkey));
      setBonkBalance(balance.value.uiAmount);
    } catch (err) {
      console.error(err);
      setError('Failed to fetch BONK token balance');
    }
  };

  useEffect(() => {
    if (walletAddress) {
      fetchBonkBalance(walletAddress);
    }
  }, [walletAddress]);

  const getTicket = async () => {
    let ticketCount = 0;
    const currentDate = new Date().toISOString();
  
    if (getTicketDate) {
      // Check if a week has passed since the last ticket acquisition
      const lastTicketDate = new Date(getTicketDate);
      const weekAgo = new Date();
      weekAgo.setDate(weekAgo.getDate() - 7);
  
      if (lastTicketDate > weekAgo) {
        setError('A week has not passed since the last ticket acquisition');
        return;
      }
    }
  
    // Calculate ticket count based on Bonk balance
    ticketCount = Math.floor(bonkBalance / 100000) * 5;
  
    // Update user's ticket count and getTicketDate in Supabase
    const { error } = await supabase.auth.updateUser({
      data: { health: userTickets + ticketCount, getTicketDate: currentDate }
    });
  
    if (error) {
      setError('Failed to update ticket count');
      return;
    }
  
    // Update local ticket count
    setTicket(ticketCount);
  };
  

  const playGame = async () => {
    if (userTickets > 0) {
      navigate('/quiz');
    } else {
      alert(
        'No Ticket Left',
        'You are out of game tickets, please buy game tickets.',
        [{ text: 'OK', onPress: () => console.log('OK Pressed') }]
      );
    }
  };

  return (
    <>
      <Navbar />
      <div
        style={{
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100vh',
          color: 'white',
          padding: '0 20px',
          boxSizing: 'border-box',
          textAlign: 'center',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            background: 'linear-gradient(45deg, rgba(254, 107, 139, 0.5), rgba(255, 142, 83, 0.5))',
            zIndex: -1,
            animation: 'flow 20s linear infinite',
          }}
        />
        <Typography variant="h1" sx={{ fontSize: '3rem', marginBottom: '20px' }}>
          Quiz Game
        </Typography>
        <Typography variant="h4" sx={{ fontSize: '1.5rem', marginBottom: '30px' }}>
          Test your knowledge and have fun!
        </Typography>
        <Button
          variant="contained"
          sx={{
            fontSize: '1.2rem',
            padding: '10px 20px',
            backgroundColor: 'rgba(255, 255, 255, 0.9)',
            color: '#6949FD',
            fontWeight: 'bold',
            textTransform: 'uppercase',
            boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
            transition: 'background-color 0.3s ease',
            '&:hover': {
              backgroundColor: 'rgba(255, 255, 255, 0.7)',
            },
          }}
          onClick={playGame}
        >
          Start Game
        </Button>
        <Box sx={{ display: 'flex', alignItems: 'center', marginTop: '20px' }}>
          <TicketIcon sx={{ marginRight: '5px' }} />
          <Typography variant="body1">{`Tickets: ${userTickets}`}</Typography>
        </Box>
        <Button onClick={connectWallet} style={{ marginTop: '20px', color: 'white' }}>
          Connect Phantom Wallet
        </Button>
        {walletAddress && (
          <div style={{ marginTop: '20px' }}>
            <Typography variant="body1" sx={{ color: 'white' }}>{`Wallet Address: ${walletAddress}`}</Typography>
            <Typography variant="body1" sx={{ color: 'white' }}>{`BONK Balance: ${bonkBalance !== null ? bonkBalance : 'Fetching...'}`}</Typography>
            {bonkBalance && bonkBalance >= 100000 && (
        <Button onClick={getTicket} style={{ marginTop: '20px', color: 'white' }}>
          Get Ticket
        </Button>
      )}
            {error && <Typography variant="body1" sx={{ color: 'red' }}>{error}</Typography>}
          </div>
        )}
      </div>
    </>
  );
}

export default PlayPage;
