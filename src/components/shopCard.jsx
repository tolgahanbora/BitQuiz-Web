/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, {useCallback} from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import PropTypes from 'prop-types';

import { usePicket } from "@picketapi/picket-react";
import { Wallet, Transaction, SystemProgram,PublicKey } from '@solana/web3.js';

function ShopCard({ product }) {
    const { name, price, quantity, image } = product;

    const { 
        isAuthenticating, 
        isAuthenticated, 
        authState, 
        logout,
        sendTransaction,
        login
    } = usePicket();

   
// user is logging in
if (isAuthenticating) return "Loading";

  
const handleLogin = useCallback(async () => {
  let auth = authState;
  if (!auth) {
      auth = await login({ chain: "solana" });
  }

  // login failed
  if (!auth) return;

  // Store accessToken and walletAddress in localStorage
  localStorage.setItem('accessToken', auth.accessToken);
  localStorage.setItem('walletAddress', auth.user.walletAddress);

  authState.user.wallet = auth.wallet;

}, [authState, login]);


const handleBuy = useCallback(async () => {
  try {
    
    const walletAddress = localStorage.getItem('walletAddress');
                const wallet = new Wallet(walletAddress, window.solana);
                const transaction = new Transaction().add(
                    SystemProgram.transfer({
                        fromPubkey: wallet.publicKey,
                        toPubkey: new PublicKey('HBsikpQzWWfiBdjRzB2idpHaDXFiVqi23m7TrjT4JXik'),
                        lamports: price * 1000000000, // SOL to lamports conversion
                    })
                );
                const signature = await wallet.signTransaction(transaction);
                const result = await window.solana.sendTransaction(transaction, [signature]);
                console.log('Transaction successful:', result);
  } catch (error) {
      console.error("Hata: ", error);
  }
}, [ price]);




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

               
         
                {!authState && (
                    <Button
                        size="large"
                        onClick={handleLogin}
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

                {authState && (
                    <Button
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
