/* eslint-disable no-unused-vars */
import React from 'react';
import { Typography, Button, Card, CardActionArea, CardContent, Box, Grid } from '@mui/material';
import ShopCard from '../components/shopCard';
import Navbar from "../components/nav"
import ticket from "../assets/tickets.png"
import timeJoker from "../assets/timingjoker.png"
import fiftyLucky from "../assets/fiftylucky.png"
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import TicketIcon from '@mui/icons-material/ConfirmationNumber'; // Import the TicketIcon
import PercentIcon from '@mui/icons-material/Percent';
import { useUserContext } from '../context/userContext';

const GameTicket = [
  { name: 'Game Ticket', price: 1, quantity: 1, image: ticket },
  { name: 'Game Ticket x3', price: 2, quantity: 3, image: ticket },
  { name: 'Game Ticket x5', price: 3, quantity: 5, image: ticket },
  { name: 'Game Ticket x10', price: 3, quantity: 10, image: ticket },
];

const TimeJoker = [
  { name: 'Timing Joker', price: 1, quantity: 1, image: timeJoker },
  { name: 'Timing Joker x3', price: 2, quantity: 3, image: timeJoker },
  { name: 'Timing Joker x5', price: 3, quantity: 5, image: timeJoker },
  { name: 'Timing Joker x10', price: 3, quantity: 10, image: timeJoker },
];

const FiftyChanceJoker = [
  { name: 'Fifty Chance', price: 1, quantity: 1, image: fiftyLucky },
  { name: 'Fifty Chance x3', price: 2, quantity: 3, image: fiftyLucky },
  { name: 'Fifty Chance x5', price: 3, quantity: 5, image: fiftyLucky },
  { name: 'Fifty Chance x10', price: 3, quantity: 10, image: fiftyLucky },
];


function ShopPage() {
  const user = useUserContext()
  return (
    <>
  
    <Navbar />
    <Box mt={20}>
      <Typography variant="h2" style={{ marginBottom: '20px', color: "white", marginTop: 13 }}>Shop</Typography>
      <Box display="flex" justifyContent="space-between" width="100%" mt={2} mb={2}>
  <Box sx={{ display: 'flex', alignItems: 'center' }}>
    <TicketIcon style={{color: "white"}} />
    <Typography sx={{ color: "#FEFEFE", fontWeight: "bold", fontSize: 15, marginLeft: '8px' }}>
      Game Ticket: {user?.user.user_metadata.health}
    </Typography>
  </Box>
  <Box sx={{ display: 'flex', alignItems: 'center' }}>
    <AccessTimeIcon style={{color: "white"}} />
    <Typography sx={{ color: "#FEFEFE", fontWeight: "bold", fontSize: 15, marginLeft: '8px' }}>
      Time Joker: {user?.user.user_metadata.timingJoker}
    </Typography>
  </Box>
  <Box sx={{ display: 'flex', alignItems: 'center' }}>
    <PercentIcon style={{color: "white"}} />
    <Typography sx={{ color: "#FEFEFE", fontWeight: "bold", fontSize: 15, marginLeft: '8px' }}>
      Fifty Lucky: {user?.user.user_metadata.fiftyPercentJoker}
    </Typography>
  </Box>
</Box>

      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Typography variant="h4" style={{ marginBottom: '10px', color: "white", textAlign: "left" }}>Game Ticket</Typography>
        </Grid>
        {GameTicket.map((product, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <ShopCard product={product} />
          </Grid>
        ))}
        <Grid item xs={12}>
          <Typography variant="h4" style={{ marginBottom: '10px', color: "white", textAlign: "left" }}>Time Joker</Typography>
        </Grid>
        {TimeJoker.map((product, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <ShopCard product={product} />
          </Grid>
        ))}
        <Grid item xs={12}>
          <Typography variant="h4" style={{ marginBottom: '10px', color: "white", textAlign: "left" }}>Fifty Chance Joker</Typography>
        </Grid>
        {FiftyChanceJoker.map((product, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <ShopCard product={product} />
          </Grid>
        ))}
      </Grid>
    </Box>
    </>
  );
}




export default ShopPage;
