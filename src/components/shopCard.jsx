/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, {useState} from 'react'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import { Connection, PublicKey, Transaction, TransactionInstruction, sendAndConfirmTransaction,SystemProgram  } from '@solana/web3.js';
import { WalletModalProvider, WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { useWallet } from '@solana/wallet-adapter-react';
function ShopCard({ product }) {
    const { name, price, quantity, image } = product;
    const solanaNetwork = 'https://api.devnet.solana.com';

    const [userWalletAddress, setUserWalletAddress] = useState('')

    const wallet = useWallet();

  const buyProduct = async () => {
        try {
            if (wallet.connected) {
                const publicKey = wallet.publicKey;
                setUserWalletAddress(publicKey.toString());
                const connection = new Connection(solanaNetwork, 'confirmed');
                const fromWallet = new PublicKey(publicKey.toString());
                const toWallet = new PublicKey('seller_wallet_public_key_here');
                const amount = 1000000000; // Amount in lamports (1 SOL = 1,000,000,000 lamports)

                const transaction = new Transaction().add(
                    SystemProgram.transfer({
                        fromPubkey: fromWallet,
                        toPubkey: toWallet,
                        lamports: amount,
                    })
                );

                const signature = await sendAndConfirmTransaction(connection, transaction, [fromWallet]);
                console.log('Transaction successful:', signature);
            } else {
                console.error('Phantom wallet not connected.');
            }
        } catch (error) {
            console.error('Error occurred while buying product:', error);
        }
    };
  
    return (
        <Card sx={{ maxWidth: 345, backgroundColor: "#311C7F", borderRadius: 5 }}>
       <CardMedia
 sx={{ height: 170}}
  image={image}
  title="shop images"
/>

          <CardContent>
            <Typography gutterBottom variant="h5" component="div" style={{color: "#FEFEFE"}}>
              {name}
            </Typography>
          </CardContent>
          <CardActions sx={{ display: 'flex', justifyContent: 'center' }}>
            <Typography variant="body2" color="text.secondary" sx={{ marginRight: 'auto', marginLeft: '20px',color: "#FEFEFE" }}>
              Price: $SOL {price}
            </Typography>
            <Button
    size="large"
    onClick={buyProduct}
    sx={{
        marginLeft: 'auto',
        marginRight: '20px',
        backgroundColor: "#6949FD",
        color: "#FEFEFE",
        fontWeight: "bold",
        '&:hover': {
            backgroundColor: '#7E64FF', // Açık renk
        },
    }}
>
    Buy
</Button>
          </CardActions>
        </Card>
      );
  }
  

export default ShopCard