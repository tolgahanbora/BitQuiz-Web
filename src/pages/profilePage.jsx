/* eslint-disable no-unused-vars */
import  { useState } from 'react';
import { Box, Typography, Modal, TextField, Button, Link, Paper, Container } from '@mui/material';
import Navbar from "../components/nav"

import AccountCircleIcon from '@mui/icons-material/AccountCircle';
// import { useUser } from '../context/UserContext';
import axios from 'axios';
import { useUserContext } from '../context/userContext';

import avatar from "../assets/avatar.png";
import solana from "../assets/solanaLogoMark.png";
import bitquizBackground from "../assets/Bıtquız_background.png";


const ProfilePage = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [solanaAddress, setSolanaAddress] = useState('');
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const user = useUserContext();

  /* const sendSolanaTokens = async (toAddress) => {
    if (!isButtonDisabled && user?.token >= 1) {
      setIsButtonDisabled(true);

      try {
        const response = await axios.post('https://google.com', {
          toWallet: toAddress,
          amountInLamports: user?.token
        });

        if (response.data) {
          // Update user token
        }
      } catch (error) {
        console.error('Transfer Error:', error);
        alert('An error occurred during the transfer process.');
      } finally {
        setIsButtonDisabled(false);
      }
    } else {
      alert('Your Solana balance is insufficient.');
    }
  }; */

  const sendSolanaTokens = () =>{
    console.log("asds")
    console.log(user)
  }

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
  
    padding: 2,
  }}
>
      <Typography variant="h3" color="white" gutterBottom>
        Profile
      </Typography>
      <Box display="flex" flexDirection="column" alignItems="center" mt={3}>
        <img src={avatar} alt="Avatar" style={{ width: 100, height: 100, borderRadius: '50%' }} />
        <Typography variant="h5" color="white" gutterBottom>
          {user.user.user_metadata.username}
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
    Solana: {user.user.user_metadata.token}
  </Typography>
  <Box display="flex" justifyContent="space-around" width="100%" mt={2}>
    <Typography variant="body1">
      Game Ticket: {user.user.user_metadata.health}
    </Typography>
    <Typography variant="body1">
      Time Joker: {user.user.user_metadata.timingJoker}
    </Typography>
    <Typography variant="body1">
      Fifty Lucky: {user.user.user_metadata.fiftyPercentJoker}
    </Typography>
  </Box>
</Paper>

        <Button variant="contained" onClick={() => setModalVisible(true)} mt={3}   
    sx={{
    mt: 3,
    backgroundColor: "#6949FD",
    "&:hover": {
      backgroundColor: "#6949FF", // 6949FD renginin biraz açığı
    },
  }}>
          Withdrawal SOL
        </Button>
      </Box>
      <Modal open={modalVisible} onClose={() => setModalVisible(false)}>
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          bgcolor="rgba(0, 0, 0, 0.7)"
          p={3}
          borderRadius={10}
          maxWidth={400}
          mx="auto"
          mt={10}
        >
          <AccountCircleIcon  size="2x" color="white" onClick={openPhantomHelp} />
          <TextField
            label="Enter Solana Address"
            variant="outlined"
            margin="normal"
            value={solanaAddress}
            onChange={(e) => setSolanaAddress(e.target.value)}
          />
          <TextField
            label="Amount of Solana"
            variant="outlined"
            margin="normal"
            value={12}
            disabled
          />
          <Button
            variant="contained"
            color="primary"
            onClick={() => sendSolanaTokens(solanaAddress)}
            disabled={isButtonDisabled}
            mt={2}
          >
            Send Solana
          </Button>
          <Button variant="contained" color="secondary" onClick={() => setModalVisible(false)} mt={2}>
            Close
          </Button>
        </Box>
      </Modal>
    </Box>
    </>
  );
};

export default ProfilePage;
