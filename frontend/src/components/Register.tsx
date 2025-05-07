import { useState } from 'react';
import { TextField, Button, Typography, Container, Box, Paper, Link, Alert, Grid } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { authApi } from '../services/api';
import { useAuth } from '../contexts/AuthContext';

const FormContainer = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(6),
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  maxWidth: '500px',
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

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    // Basic validation
    if (!email || !password || !passwordConfirm) {
      setError('Alla obligatoriska fält måste fyllas i');
      return;
    }
    
    if (password !== passwordConfirm) {
      setError('Lösenorden matchar inte');
      return;
    }
    
    if (password.length < 8) {
      setError('Lösenordet måste vara minst 8 tecken långt');
      return;
    }

    try {
      setLoading(true);
      await authApi.register({
        email,
        password,
        password_confirm: passwordConfirm,
        name: name || undefined
      });
      
      // If registration was successful, login the user
      const loginResponse = await authApi.login({
        username: email,
        password
      });
      
      login(loginResponse.access_token);
      navigate('/');
    } catch (err: any) {
      console.error('Registration error:', err);
      setError(err.response?.data?.detail || 'Ett fel uppstod vid registreringen. Försök igen.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="sm" sx={{ py: 12 }}>
      <Box sx={{ textAlign: 'center', mb: 6 }}>
        <Typography variant="h4" component="h1" fontWeight={600} letterSpacing="-0.5px" mb={1}>
          Skapa ett konto
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Gå med i Stryktipset App för att börja lägga smarta tips
        </Typography>
      </Box>

      <FormContainer elevation={0}>
        {error && <Alert severity="error" sx={{ width: '100%', mb: 3, borderRadius: '10px' }}>{error}</Alert>}
        
        <form onSubmit={handleSubmit} style={{ width: '100%' }}>
          <FormField
            label="Namn (frivilligt)"
            fullWidth
            value={name}
            onChange={(e) => setName(e.target.value)}
            variant="outlined"
            autoComplete="name"
          />
          
          <FormField
            label="E-post"
            type="email"
            fullWidth
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            variant="outlined"
            autoComplete="email"
            required
          />
          
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <FormField
                label="Lösenord"
                type="password"
                fullWidth
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                variant="outlined"
                autoComplete="new-password"
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormField
                label="Bekräfta lösenord"
                type="password"
                fullWidth
                value={passwordConfirm}
                onChange={(e) => setPasswordConfirm(e.target.value)}
                variant="outlined"
                autoComplete="new-password"
                required
              />
            </Grid>
          </Grid>
          
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1, mb: 3 }}>
            Genom att registrera dig godkänner du våra <Link component={RouterLink} to="/terms" color="primary" sx={{ textDecoration: 'none' }}>användarvillkor</Link> och <Link component={RouterLink} to="/privacy" color="primary" sx={{ textDecoration: 'none' }}>integritetspolicy</Link>.
          </Typography>
          
          <SubmitButton
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            disabled={loading}
          >
            {loading ? 'Registrerar...' : 'Skapa konto'}
          </SubmitButton>
        </form>
        
        <Box sx={{ mt: 3, textAlign: 'center' }}>
          <Typography variant="body2" color="text.secondary">
            Har du redan ett konto?{' '}
            <Link 
              component={RouterLink} 
              to="/login"
              sx={{
                color: 'primary.main',
                textDecoration: 'none',
                fontWeight: 500,
                '&:hover': {
                  textDecoration: 'underline',
                },
              }}
            >
              Logga in
            </Link>
          </Typography>
        </Box>
      </FormContainer>
    </Container>
  );
};

export default Register;
