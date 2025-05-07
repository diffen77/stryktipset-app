import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AppBar, Box, Toolbar, Container, IconButton, Menu, MenuItem, Button, Drawer, List, ListItem, ListItemButton, ListItemText, Divider } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import { useAuth } from '../contexts/AuthContext';

const navItems = [
  { name: 'Home', path: '/' },
  { name: 'Products', path: '/products' },
  { name: 'Store', path: '/store' },
  { name: 'Support', path: '/support' },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user, logout } = useAuth();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleMobileMenuToggle = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <AppBar 
      position="fixed" 
      sx={{
        backgroundColor: scrolled ? 'rgba(255, 255, 255, 0.8)' : 'rgba(255, 255, 255, 0.5)',
        backdropFilter: 'blur(20px)',
        boxShadow: 'none',
        borderBottom: scrolled ? '1px solid rgba(0, 0, 0, 0.1)' : 'none',
        color: '#1d1d1f',
        transition: 'all 0.3s ease',
      }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters sx={{ minHeight: '48px' }}>
          {/* Logo/Brand */}
          <Box sx={{ display: 'flex', flexGrow: { xs: 1, md: 0 } }}>
            <Link to="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center' }}>
              <Box 
                component="img" 
                src="/logo.svg" 
                alt="Stryktipset App"
                sx={{ 
                  height: 28,
                  width: 'auto',
                  display: { xs: 'none', md: 'flex' },
                  mr: 1
                }}
              />
              <Box
                sx={{
                  display: { md: 'none' },
                  fontWeight: 600,
                  fontSize: '1.2rem',
                  color: '#1d1d1f',
                  textDecoration: 'none',
                  letterSpacing: '-0.5px',
                }}
              >
                Stryktipset
              </Box>
            </Link>
          </Box>

          {/* Desktop Navigation */}
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, justifyContent: 'center' }}>
            {navItems.map((item) => (
              <Button
                key={item.name}
                component={Link}
                to={item.path}
                sx={{
                  my: 1,
                  mx: 1.5,
                  color: location.pathname === item.path ? '#0071e3' : '#1d1d1f',
                  fontWeight: 500,
                  fontSize: '14px',
                  textTransform: 'none',
                  '&:hover': {
                    backgroundColor: 'transparent',
                    opacity: 0.7,
                  },
                }}
              >
                {item.name}
              </Button>
            ))}
          </Box>

          {/* User Menu */}
          <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
            {user ? (
              <Button
                onClick={logout}
                sx={{
                  color: '#0071e3',
                  textTransform: 'none',
                  fontSize: '14px',
                  fontWeight: 500,
                }}
              >
                Logout
              </Button>
            ) : (
              <>
                <Button
                  component={Link}
                  to="/login"
                  sx={{
                    color: '#0071e3',
                    textTransform: 'none',
                    fontSize: '14px',
                    fontWeight: 500,
                    mr: 2,
                  }}
                >
                  Log In
                </Button>
                <Button
                  component={Link}
                  to="/register"
                  sx={{
                    color: 'white',
                    backgroundColor: '#0071e3',
                    textTransform: 'none',
                    fontSize: '14px',
                    fontWeight: 500,
                    borderRadius: '980px',
                    px: 3,
                    '&:hover': {
                      backgroundColor: '#0077ed',
                    },
                  }}
                >
                  Register
                </Button>
              </>
            )}
          </Box>

          {/* Mobile Menu Button */}
          <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="menu"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleMobileMenuToggle}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </Container>

      {/* Mobile Menu Drawer */}
      <Drawer
        anchor="right"
        open={mobileMenuOpen}
        onClose={handleMobileMenuToggle}
        sx={{
          '& .MuiDrawer-paper': {
            width: '100%',
            backgroundColor: 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(20px)',
          },
        }}
      >
        <Box sx={{ p: 2, display: 'flex', justifyContent: 'flex-end' }}>
          <IconButton onClick={handleMobileMenuToggle}>
            <CloseIcon />
          </IconButton>
        </Box>
        <Divider />
        <List>
          {navItems.map((item) => (
            <ListItem key={item.name} disablePadding>
              <ListItemButton 
                component={Link} 
                to={item.path}
                onClick={handleMobileMenuToggle}
                sx={{
                  textAlign: 'center',
                  py: 2,
                  color: location.pathname === item.path ? '#0071e3' : '#1d1d1f',
                }}
              >
                <ListItemText 
                  primary={item.name} 
                  primaryTypographyProps={{
                    fontSize: '18px',
                    fontWeight: 500,
                  }}
                />
              </ListItemButton>
            </ListItem>
          ))}
          <Divider sx={{ my: 2 }} />
          {user ? (
            <ListItem disablePadding>
              <ListItemButton 
                onClick={() => {
                  logout();
                  handleMobileMenuToggle();
                }}
                sx={{ textAlign: 'center', py: 2 }}
              >
                <ListItemText 
                  primary="Logout" 
                  primaryTypographyProps={{
                    fontSize: '18px',
                    fontWeight: 500,
                    color: '#0071e3',
                  }}
                />
              </ListItemButton>
            </ListItem>
          ) : (
            <>
              <ListItem disablePadding>
                <ListItemButton 
                  component={Link} 
                  to="/login"
                  onClick={handleMobileMenuToggle}
                  sx={{ textAlign: 'center', py: 2 }}
                >
                  <ListItemText 
                    primary="Log In" 
                    primaryTypographyProps={{
                      fontSize: '18px',
                      fontWeight: 500,
                      color: '#0071e3',
                    }}
                  />
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding>
                <ListItemButton 
                  component={Link} 
                  to="/register"
                  onClick={handleMobileMenuToggle}
                  sx={{ textAlign: 'center', py: 2 }}
                >
                  <ListItemText 
                    primary="Register" 
                    primaryTypographyProps={{
                      fontSize: '18px',
                      fontWeight: 500,
                      color: '#0071e3',
                    }}
                  />
                </ListItemButton>
              </ListItem>
            </>
          )}
        </List>
      </Drawer>
    </AppBar>
  );
};

export default Navbar; 