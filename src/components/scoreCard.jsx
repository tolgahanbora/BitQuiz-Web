/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState, useRef } from 'react';
import { Stack, Paper, Button, Typography, Container } from '@mui/material';
import Confetti from 'react-dom-confetti';
import supabase from '../utils/supabase';
import { useUserContext } from '../context/userContext';
import { useNavigate } from 'react-router-dom';

const Score = ({token, trueAnswers,totalToken}) => {
    const trueAnswer = trueAnswers || 0
    const totalEarnedBTC = token || 0;
    const navigate = useNavigate()
    const confettiRef = useRef(null)
    const { user } = useUserContext();
    const [isConfettiActive, setIsConfettiActive] = useState(false);

    const fetchUserData = async () => {
        try {

            const response = await fetch(`${import.meta.env.VITE_FRAUD_API}/reset-timer`);
            const data = await response.json();
        
        } catch (error) {
            console.error('Error fetching user data:', error);
        }
    };
 
    useEffect(() => {
        const timer = setTimeout(() => {
            setIsConfettiActive(true);
        }, 800);
    
        return () => {
            clearTimeout(timer);
            setIsConfettiActive(false); // Set isConfettiActive to false when component unmounts
        };
    }, []);

    const updateToken = async () => {
        try {
            // profile table da ki değeri azaltmıyor
            const newToken = await (totalToken + (totalEarnedBTC));
          
            await supabase.auth.updateUser({
                data: { token: newToken },
            });
        } catch (error) {
            console.error('Error updating ticket:', error);
        }
    };

    useEffect(() => {
        if(user) {
            updateToken();
            fetchUserData()
        }
       
    }, [trueAnswer]);

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

    const onPlayAgain = async () => {
        navigate("/play")
    };

    const onProfile = async () => {
        navigate("/profile")
    };

    return (
        <Container  style={{
            backgroundColor: "#1F1147",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            minWidth: { xs: "100%", sm: "80%", md: "65%" },
           maxWidth: { xs: "20%", sm: "20%", md: "65%" },
        }}>
            <Stack
                direction="column"
                alignItems="center"
                spacing={2}
                sx={{
                    color: "#FEFEFE",
                    fontSize: 15,
                    fontWeight: "bold",
                    textAlign: "center"
                }}
            >
                <Typography>Total Question you got right</Typography>
                <Typography>{trueAnswer} correct in 10 questions</Typography>
            </Stack>
            <Paper
                sx={{
                    marginTop: 2,
                    marginBottom: 4,
                    borderRadius: 3,
                    padding: 2,
                    width: "65%",
                    height: "30%",
                    backgroundColor: "#32167C",
                    textAlign: "center",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center"
                }}
                xs={12} sm={6} md={3}
            >
                <Typography sx={{
                    color: "#FEFEFE",
                    fontSize: 16,
                    fontWeight: "bold",
                }}>Earned $SOL</Typography>
                <Stack
                    sx={{
                        width: 120,
                        height: 120,
                        backgroundColor: "#FAB42B",
                        borderRadius: "50%",
                        alignItems: "center",
                        justifyContent: "center",
                    }}
                >
                    <Typography sx={{
                        color: "#FEFEFE",
                        fontSize: 20,
                        fontWeight: "bold",
                    }}>{totalEarnedBTC.toFixed(6)}</Typography>
                </Stack>
            </Paper>
            <Confetti   ref={confettiRef} active={isConfettiActive} config={config} />
            <Stack direction={{ xs: 'column', md: 'row' }} spacing={2} sx={{  width: "100%", marginBottom: 3}}>
                <Button
                    fullWidth
                    sx={{
                        width: "100%",
                        color: "#FEFEFE",
                        margin: 10,
                        borderRadius: 13,
                        backgroundColor: "#6949FD",
                        justifyContent: "center",
                        '&:hover': {
                            backgroundColor: '#7E64FF', // Açık renk
                        },
                    }}
                    onClick={onPlayAgain}
                >
                    Play Again
                </Button>
                <Button
                    fullWidth
                    sx={{
                        color: "#FEFEFE",
                        margin: 10,
                        borderRadius: 13,
                        backgroundColor: "#6949FD",
                        justifyContent: "center",
                        '&:hover': {
                            backgroundColor: '#7E64FF', // Açık renk
                        },
                    }}
                    onClick={onProfile}
                >
                    Profile
                </Button>
            </Stack>
        </Container>
    );
};

export default Score;
