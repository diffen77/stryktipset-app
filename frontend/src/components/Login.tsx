import { useState } from 'react';
import { Button, TextField, Paper, Typography, Box, Link } from '@mui/material';
import { authApi } from '../services/api';
import { useAuth } from '../contexts/AuthContext';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await authApi.login({ username, password });
      login(response.access_token);
    } catch (err) {
      setError('Invalid username or password');
    }
  };

  return (
    <Box
      sx={{
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        bgcolor: 'grey.100'
      }}
    >
      <Paper
        elevation={3}
        sx={{
          p: 4,
          width: '100%',
          maxWidth: 400,
        }}
      >
        <Typography variant="h5" component="h1" gutterBottom>
          Login to Stryktipset
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Username"
            margin="normal"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            error={!!error}
          />
          <TextField
            fullWidth
            label="Password"
            type="password"
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            error={!!error}
            helperText={error}
          />
          <Button
            fullWidth
            type="submit"
            variant="contained"
            sx={{ mt: 3 }}
          >
            Sign In
          </Button>
        </form>
        <Box sx={{ mt: 2, textAlign: 'center' }}>
          <Link href="#" onClick={() => {/* TODO: Implement password reset */}} sx={{ display: 'block', mb: 1 }}>
            Forgot password?
          </Link>
          <Link href="/register">
            Don't have an account? Register
          </Link>
        </Box>
      </Paper>
    </Box>
  );
}
