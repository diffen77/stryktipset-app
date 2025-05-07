import { useEffect, useRef } from 'react';
import { Box, Container, Typography, Button, Grid, Card, CardContent, CardMedia } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Link } from 'react-router-dom';

// Styled components
const HeroSection = styled(Box)(() => ({
  minHeight: '90vh',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  textAlign: 'center',
  backgroundColor: '#fbfbfd',
  paddingTop: '64px',
  paddingBottom: '64px',
  position: 'relative',
  overflow: 'hidden',
}));

const FeatureSection = styled(Box)(() => ({
  padding: '120px 0',
  backgroundColor: '#fff',
}));

const FeatureCard = styled(Card)(() => ({
  borderRadius: '18px',
  overflow: 'hidden',
  boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  '&:hover': {
    transform: 'translateY(-10px)',
    boxShadow: '0 30px 60px rgba(0,0,0,0.15)',
  },
}));

const AppleButton = styled(Button)(() => ({
  borderRadius: '980px',
  textTransform: 'none',
  padding: '12px 24px',
  fontSize: '17px',
  fontWeight: 500,
  boxShadow: 'none',
  '&:hover': {
    boxShadow: 'none',
  },
}));

const StyledLink = styled(Link)({
  textDecoration: 'none',
});

const Home = () => {
  const heroSectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleParallax = () => {
      if (!heroSectionRef.current) return;
      const scrollTop = window.scrollY;
      const parallaxSpeed = 0.5;
      const offset = scrollTop * parallaxSpeed;
      
      if (heroSectionRef.current.querySelector('.parallax-bg')) {
        const bgElement = heroSectionRef.current.querySelector('.parallax-bg') as HTMLElement;
        bgElement.style.transform = `translateY(${offset}px)`;
      }
    };

    window.addEventListener('scroll', handleParallax);
    return () => window.removeEventListener('scroll', handleParallax);
  }, []);

  return (
    <Box>
      {/* Hero Section */}
      <HeroSection ref={heroSectionRef}>
        <Box 
          className="parallax-bg"
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '120%',
            zIndex: 0,
            backgroundImage: 'linear-gradient(180deg, rgba(251,251,253,0) 0%, rgba(251,251,253,1) 100%), url("/hero-bg.svg")',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
          <Typography 
            variant="h1"
            sx={{
              fontSize: { xs: '40px', md: '56px' },
              fontWeight: 600,
              letterSpacing: '-0.5px',
              marginBottom: '16px',
              color: '#1d1d1f',
            }}
          >
            Stryktipset. Förenklat.
          </Typography>
          <Typography 
            variant="h2"
            sx={{
              fontSize: { xs: '24px', md: '28px' },
              fontWeight: 400,
              color: '#86868b',
              marginBottom: '32px',
              maxWidth: '600px',
              mx: 'auto',
            }}
          >
            Fantastisk spelupplevelse med moderna verktyg för att lägga dina tips.
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, flexWrap: 'wrap' }}>
            <StyledLink to="/register">
              <AppleButton
                variant="contained"
                sx={{
                  backgroundColor: '#0071e3',
                  color: 'white',
                  '&:hover': {
                    backgroundColor: '#0077ed',
                  },
                }}
              >
                Kom igång
              </AppleButton>
            </StyledLink>
            <StyledLink to="/learn-more">
              <AppleButton
                variant="text"
                sx={{
                  color: '#0071e3',
                }}
              >
                Läs mer
              </AppleButton>
            </StyledLink>
          </Box>
        </Container>
      </HeroSection>

      {/* Features Section */}
      <FeatureSection>
        <Container maxWidth="lg">
          <Typography 
            variant="h2"
            align="center"
            sx={{
              fontSize: { xs: '32px', md: '40px' },
              fontWeight: 600,
              letterSpacing: '-0.5px',
              marginBottom: '16px',
              color: '#1d1d1f',
            }}
          >
            Funktioner
          </Typography>
          <Typography 
            variant="h3"
            align="center"
            sx={{
              fontSize: { xs: '20px', md: '24px' },
              fontWeight: 400,
              color: '#86868b',
              marginBottom: '64px',
              maxWidth: '600px',
              mx: 'auto',
            }}
          >
            Upptäck de kraftfulla verktygen som hjälper dig att lägga dina tipprader.
          </Typography>
          
          <Grid container spacing={4}>
            {[
              {
                title: 'Smart tipsrad',
                description: 'Använder AI för att generera intelligenta tipsrader baserat på statistik.',
                image: '/feature1.svg'
              },
              {
                title: 'Statistikverktyg',
                description: 'Analysera tidigare resultat och få insikter för att förbättra dina chanser.',
                image: '/feature2.svg'
              },
              {
                title: 'Delning med vänner',
                description: 'Dela dina tipsrader enkelt med vänner och familj.',
                image: '/feature3.svg'
              },
            ].map((feature, index) => (
              <Grid item xs={12} md={4} key={index}>
                <FeatureCard>
                  <CardMedia
                    component="img"
                    height="200"
                    image={feature.image}
                    alt={feature.title}
                    sx={{ 
                      objectFit: 'cover',
                      backgroundColor: '#f5f5f7'
                    }}
                  />
                  <CardContent sx={{ flexGrow: 1, p: 3 }}>
                    <Typography 
                      gutterBottom 
                      variant="h5" 
                      component="div"
                      sx={{ 
                        fontWeight: 600,
                        fontSize: '22px',
                        mb: 1
                      }}
                    >
                      {feature.title}
                    </Typography>
                    <Typography 
                      variant="body1" 
                      color="text.secondary"
                      sx={{ fontSize: '16px' }}
                    >
                      {feature.description}
                    </Typography>
                  </CardContent>
                </FeatureCard>
              </Grid>
            ))}
          </Grid>
        </Container>
      </FeatureSection>

      {/* CTA Section */}
      <Box sx={{ 
        backgroundColor: '#000', 
        color: '#fff', 
        py: 15,
        textAlign: 'center' 
      }}>
        <Container maxWidth="md">
          <Typography
            variant="h2"
            sx={{
              fontSize: { xs: '32px', md: '48px' },
              fontWeight: 600,
              letterSpacing: '-0.5px',
              mb: 3,
            }}
          >
            Ta din tippningsupplevelse till nästa nivå
          </Typography>
          <Typography
            variant="body1"
            sx={{
              fontSize: { xs: '18px', md: '21px' },
              fontWeight: 400,
              mb: 5,
              maxWidth: '700px',
              mx: 'auto',
              color: 'rgba(255,255,255,0.8)',
            }}
          >
            Gå med i tusentals tippare som redan använder Stryktipset App för att förbättra sina chanser att vinna.
          </Typography>
          <StyledLink to="/register">
            <AppleButton
              variant="contained"
              sx={{
                backgroundColor: '#0071e3',
                color: 'white',
                '&:hover': {
                  backgroundColor: '#0077ed',
                },
                px: 4,
                py: 1.5,
                fontSize: '18px',
              }}
            >
              Registrera dig nu
            </AppleButton>
          </StyledLink>
        </Container>
      </Box>
    </Box>
  );
};

export default Home; 