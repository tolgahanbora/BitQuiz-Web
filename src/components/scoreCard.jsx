/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState, useRef } from 'react';
import { Stack, Paper, Button, Typography, Container } from '@mui/material';
import Confetti from 'react-dom-confetti';
import supabase from '../utils/supabase';
import { useUserContext } from '../context/userContext';
import { useNavigate } from 'react-router-dom';

const Score = ({token, trueAnswers}) => {
    const trueAnswer = trueAnswers || 0
    const totalEarnedBTC = token || 0;
    const navigate = useNavigate()

    const { user } = useUserContext();

    useEffect(() => {
        updateToken();
    }, []);

    const updateToken = async () => {
        try {
            const newToken = user.user.user_metadata.token + totalEarnedBTC;
            await supabase.auth.updateUser({
                data: { token: newToken },
            });
        } catch (error) {
            console.error('Error updating ticket:', error);
        }
    };

    const config = {
        angle: 90,
        spread: 45,
        startVelocity: 45,
        elementCount: 50,
        dragFriction: 0.1,
        duration: 3000,
        stagger: 0,
        width: "10px",
        height: "10px",
        colors: ["#32167C", "#6949FD"],
        random: Math.random
    };

    const onPlayAgain = async () => {
        navigate("/play")
    };

    const onProfile = async () => {
        navigate("/profile")
    };

    return (
        <Container style={{
            backgroundColor: "#1F1147",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
           
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
            <Confetti active={true} config={config} />
            <Stack direction="row" spacing={2} sx={{  width: "100%", marginBottom: 3}}>
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
