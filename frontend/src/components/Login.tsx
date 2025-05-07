import { useState } from 'react';
import { TextField, Button, Typography, Container, Box, Paper, Link, Alert } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Link as RouterLink } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { authApi } from '../services/api';

const FormContainer = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(6),
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  maxWidth: '430px',
  margin: '0 auto',
  borderRadius: '20px',
  boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
  background: 'rgba(255, 255, 255, 0.95)',
  backdropFilter: 'blur(10px)',
  border: '1px solid rgba(255, 255, 255, 0.3)',
}));

const FormField = styled(TextField)(({ theme }) => ({
  marginBottom: theme.spacing(3),
  '& .MuiOutlinedInput-root': {
    borderRadius: '12px',
    transition: 'all 0.2s ease',
    '&:hover fieldset': {
      borderColor: theme.palette.primary.main,
    },
    '&.Mui-focused fieldset': {
      borderColor: theme.palette.primary.main,
      borderWidth: '1px',
    },
  },
  '& .MuiInputLabel-root': {
    color: '#86868b',
  },
}));

const SubmitButton = styled(Button)(({ theme }) => ({
  padding: '14px 0',
  borderRadius: '980px',
  fontSize: '16px',
  fontWeight: 500,
  marginTop: theme.spacing(2),
  marginBottom: theme.spacing(2),
  transition: 'all 0.2s ease',
}));

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    // Validate inputs
    if (!username || !password) {
      setError('Alla fält måste fyllas i');
      return;
    }

    try {
      setLoading(true);
      const response = await authApi.login({ username, password });
      login(response.access_token);
    } catch (err) {
      setError('Inloggning misslyckades. Kontrollera dina uppgifter och försök igen.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="sm" sx={{ py: 12 }}>
      <Box sx={{ textAlign: 'center', mb: 6 }}>
        <Typography variant="h4" component="h1" fontWeight={600} letterSpacing="-0.5px" mb={1}>
          Välkommen tillbaka
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Logga in för att fortsätta till Stryktipset App
        </Typography>
      </Box>

      <FormContainer elevation={0}>
        {error && <Alert severity="error" sx={{ width: '100%', mb: 3, borderRadius: '10px' }}>{error}</Alert>}
        
        <form onSubmit={handleSubmit} style={{ width: '100%' }}>
          <FormField
            label="Användarnamn eller e-post"
            type="text"
            fullWidth
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            variant="outlined"
            autoComplete="username"
            required
          />
          
          <FormField
            label="Lösenord"
            type="password"
            fullWidth
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            variant="outlined"
            autoComplete="current-password"
            required
          />
          
          <SubmitButton
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            disabled={loading}
          >
            {loading ? 'Loggar in...' : 'Logga in'}
          </SubmitButton>
          
          <Link
            component={RouterLink}
            to="/forgot-password"
            sx={{
              display: 'block',
              textAlign: 'center',
              mt: 1,
              mb: 3,
              color: 'primary.main',
              textDecoration: 'none',
              '&:hover': {
                textDecoration: 'underline',
              },
            }}
          >
            Glömt lösenord?
          </Link>
        </form>
        
        <Box sx={{ mt: 3, textAlign: 'center' }}>
          <Typography variant="body2" color="text.secondary">
            Har du inget konto?{' '}
            <Link 
              component={RouterLink} 
              to="/register"
              sx={{
                color: 'primary.main',
                textDecoration: 'none',
                fontWeight: 500,
                '&:hover': {
                  textDecoration: 'underline',
                },
              }}
            >
              Registrera dig
            </Link>
          </Typography>
        </Box>
      </FormContainer>
    </Container>
  );
};

export default Login;
