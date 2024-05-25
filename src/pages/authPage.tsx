import React, { useState } from 'react';
import { Grid, Card, CardContent, Typography, TextField, Button, Link } from '@mui/material';
import supabase from "../utils/supabase"
import { useNavigate  } from 'react-router-dom';

function AuthPage() {
  const [isRegistering, setIsRegistering] = useState(false);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  const handleToggleRegister = () => {
    setIsRegistering(!isRegistering);
  };

  const handleSignUp = async () => {
    try {
      const { data, error } = await supabase.auth.signUp({
        email: email,
        password: password,
        options: {
          data: {
            username: username,
            health: 5,
            token: 0,
            timingJoker: 0,
            fiftyPercentJoker: 0
          }
        }
      });
      if (error) {
        throw error;
      }
  
      setIsRegistering(false)
    } catch (error) {
      console.error(error.message);
    }
  };

  const handleSignIn = async () => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) {
        throw error;
      }
  
      // Başarılı giriş sonrası profil sayfasına yönlendirme
      sessionStorage.setItem('access_token', data.session.access_token);
      navigate('/profile');
      window.location.reload(); // Sayfayı yenile
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <Grid container justifyContent="center" alignItems="center" style={{ height: '100vh' }}>
      <Grid item xs={6}>
        <Card>
          <CardContent>
            <Typography variant="h5" gutterBottom>{isRegistering ? 'Register' : 'Login'}</Typography>
            {isRegistering && (
              <TextField label="Username" variant="outlined" fullWidth margin="normal" value={username} onChange={(e) => setUsername(e.target.value)} />
            )}
            <TextField label="Email" variant="outlined" fullWidth margin="normal" value={email} onChange={(e) => setEmail(e.target.value)} />
            <TextField label="Password" variant="outlined" fullWidth margin="normal" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            {isRegistering && (
              <TextField label="Re-enter Password" variant="outlined" fullWidth margin="normal" type="password" />
            )}
            <Button variant="contained" onClick={isRegistering ? handleSignUp : handleSignIn} sx={{
              backgroundColor: "#6949FD",
              '&:hover': {
                backgroundColor: "#8d75ff",
              },
            }} fullWidth>
              {isRegistering ? 'Sign Up' : 'Login'}
            </Button>
            <Typography variant="body2" style={{ marginTop: '1rem' }}>
              {isRegistering ? 'Already have an account? ' : "Don't have an account? "}
              <Link component="button" onClick={handleToggleRegister}>
                {isRegistering ? 'Login here' : 'Register here'}
              </Link>
            </Typography>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
}

export default AuthPage;
