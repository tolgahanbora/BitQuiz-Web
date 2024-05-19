/* eslint-disable no-unused-vars */
import React, {useState} from 'react';
import { Typography, Button, Box } from '@mui/material';
import Navbar from "../components/nav"
import { useNavigate } from 'react-router-dom';
import TicketIcon from '@mui/icons-material/ConfirmationNumber'; // Import the TicketIcon
import { useUserContext } from '../context/userContext';
import supabase from '../utils/supabase';

function PlayPage() {

  const navigate = useNavigate()
  const {user, user2} = useUserContext()
  const [ticket, setTicket] = useState();


  // Assume userTickets is the variable holding the number of tickets the user has
  const userTickets = user?.health; // Example value, replace with actual logic


  const updateTicket = async (newTicketValue) => {
    try {
      await supabase.auth.updateUser({
        data: { health: newTicketValue },
      });
      setTicket(newTicketValue);
    } catch (error) {
      console.error('Error updating ticket:', error);
    }
  };

 

  const playGame = async () => {
    if (userTickets > 0) {
  
      navigate("/quiz")
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
        <TicketIcon sx={{ marginRight: '5px' }} /> {/* Display TicketIcon */}
        <Typography variant="body1">{`Tickets: ${userTickets}`}</Typography>
      </Box>
    </div>
    </>
  );
}

export default PlayPage;
