import { Box, Container, Typography, Grid, Link as MuiLink, List, ListItem } from '@mui/material';
import { Link } from 'react-router-dom';
import { styled } from '@mui/material/styles';

const StyledFooterLink = styled(Link)({
  color: '#6e6e73',
  textDecoration: 'none',
  fontSize: '12px',
  '&:hover': {
    color: '#1d1d1f',
    textDecoration: 'underline',
  },
});

const StyledExternalLink = styled(MuiLink)({
  color: '#6e6e73',
  textDecoration: 'none',
  fontSize: '12px',
  '&:hover': {
    color: '#1d1d1f',
    textDecoration: 'underline',
  },
});

const FooterSection = styled(Box)({
  backgroundColor: '#f5f5f7',
  padding: '16px 0',
  color: '#6e6e73',
});

const FooterHeading = styled(Typography)({
  fontSize: '12px',
  fontWeight: 600,
  marginBottom: '10px',
  color: '#1d1d1f',
});

const Footer = () => {
  const footerSections = [
    {
      title: 'Stryktipset',
      links: [
        { title: 'Om oss', path: '/about' },
        { title: 'Kontakt', path: '/contact' },
        { title: 'Karriär', path: '/careers' },
        { title: 'Nyheter', path: '/news' },
        { title: 'Vanliga frågor', path: '/faq' },
      ],
    },
    {
      title: 'Tjänster',
      links: [
        { title: 'Stryktipset', path: '/services/stryktipset' },
        { title: 'Europatipset', path: '/services/europatipset' },
        { title: 'Måltipset', path: '/services/maltipset' },
        { title: 'Topptipset', path: '/services/topptipset' },
      ],
    },
    {
      title: 'Konto',
      links: [
        { title: 'Hantera konto', path: '/account' },
        { title: 'Sparade tipprader', path: '/saved-rows' },
        { title: 'Inställningar', path: '/settings' },
      ],
    },
    {
      title: 'Support',
      links: [
        { title: 'Kundtjänst', path: '/support' },
        { title: 'Hjälpcenter', path: '/help' },
        { title: 'Användningsvillkor', path: '/terms' },
        { title: 'Integritet', path: '/privacy' },
      ],
    },
  ];

  return (
    <FooterSection>
      <Container maxWidth="lg">
        <Box sx={{ borderBottom: '1px solid #d2d2d7', py: 4 }}>
          <Grid container spacing={6}>
            {footerSections.map((section, index) => (
              <Grid item xs={6} md={3} key={index}>
                <FooterHeading variant="h6">{section.title}</FooterHeading>
                <List sx={{ p: 0 }}>
                  {section.links.map((link, linkIndex) => (
                    <ListItem key={linkIndex} sx={{ p: 0, mb: 1 }}>
                      <StyledFooterLink to={link.path}>
                        {link.title}
                      </StyledFooterLink>
                    </ListItem>
                  ))}
                </List>
              </Grid>
            ))}
          </Grid>
        </Box>
        
        <Box sx={{ py: 3 }}>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, mb: 3 }}>
            <StyledExternalLink href="tel:+46123456789">
              Kontakta oss: +46 12 345 67 89
            </StyledExternalLink>
            <Box sx={{ flexGrow: 1 }} />
            <StyledExternalLink href="https://facebook.com" target="_blank" rel="noopener">
              Facebook
            </StyledExternalLink>
            <StyledExternalLink href="https://twitter.com" target="_blank" rel="noopener">
              Twitter
            </StyledExternalLink>
            <StyledExternalLink href="https://instagram.com" target="_blank" rel="noopener">
              Instagram
            </StyledExternalLink>
          </Box>
          
          <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="body2" sx={{ color: '#86868b', fontSize: '12px' }}>
              Copyright © {new Date().getFullYear()} Stryktipset App. Alla rättigheter förbehållna.
            </Typography>
            <Box sx={{ display: 'flex', gap: 3 }}>
              <StyledFooterLink to="/legal/privacy">
                Integritetspolicy
              </StyledFooterLink>
              <StyledFooterLink to="/legal/terms">
                Användarvillkor
              </StyledFooterLink>
              <StyledFooterLink to="/legal/cookies">
                Cookies
              </StyledFooterLink>
            </Box>
          </Box>
        </Box>
      </Container>
    </FooterSection>
  );
};

export default Footer; 