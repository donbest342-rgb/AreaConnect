import React from 'react';
import {
  Box,
  Container,
  Grid,
  Typography,
  TextField,
  Button,
  IconButton,
  InputAdornment,
  Divider,
  Link
} from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import TwitterIcon from '@mui/icons-material/Twitter';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/logo.png';

export default function Footer() {
  const Navigate = useNavigate();
  const currentYear = new Date().getFullYear();

  return (
    <Box
      component="footer"
      sx={{
        bgcolor: '#0a1929', // dark navy / almost black background
        color: 'grey.400',
        pt: 8,
        pb: 4,
        borderTop: '1px solid',
        borderColor: 'grey.800',
      }}
    >
      <Container maxWidth="lg">
        {/* Main Typographys + subscribe section */}
        <Grid container spacing={6}>
          {/* Company */}
          <Grid item xs={6} sm={3}>
            <Typography
              variant="subtitle1"
              fontWeight={600}
              color="white"
              gutterBottom
              sx={{ mb: 2.5 }}
            >
              Company
            </Typography>
            <Box component="ul" sx={{ listStyle: 'none', p: 0, m: 0 }}>
              <li>
                <Typography onClick={() => Navigate('/help-center')} color="inherit" underline="hover" sx={{ display: 'block', py: 0.8 }}>
                  Help Center
                </Typography>
              </li>
              <li>
                <Typography onClick={() => Navigate('/contact')} color="inherit" underline="hover" sx={{ display: 'block', py: 0.8 }}>
                  Contact
                </Typography>
              </li>
              <li>
                <Typography onClick={() => Navigate('/about')} color="inherit" underline="hover" sx={{ display: 'block', py: 0.8 }}>
                  About Us
                </Typography>
              </li>
            </Box>
          </Grid>

          {/* Customers */}
          <Grid item xs={6} sm={3}>
            <Typography
              variant="subtitle1"
              fontWeight={600}
              color="white"
              gutterBottom
              sx={{ mb: 2.5 }}
            >
              Customers
            </Typography>
            <Box component="ul" sx={{ listStyle: 'none', p: 0, m: 0 }}>
              <li>
                <Typography onClick={() => Navigate('/estimates')} color="inherit" underline="hover" sx={{ display: 'block', py: 0.8 }}>
                  Cost Estimates
                </Typography>
              </li>
              <li>
                <Typography onClick={() => Navigate('/customer-safety-tips')} color="inherit" underline="hover" sx={{ display: 'block', py: 0.8 }}>
                  Customer Safety Tips
                </Typography>
              </li>
            </Box>
          </Grid>

          {/* Professionals */}
          <Grid item xs={6} sm={3}>
            <Typography
              variant="subtitle1"
              fontWeight={600}
              color="white"
              gutterBottom
              sx={{ mb: 2.5 }}
            >
              Professionals
            </Typography>
            <Box component="ul" sx={{ listStyle: 'none', p: 0, m: 0 }}>
              <li>
                <Typography onClick={() => Navigate('/help-center')} color="inherit" underline="hover" sx={{ display: 'block', py: 0.8 }}>
                  Help Center
                </Typography>
              </li>
            </Box>
          </Grid>

          {/* Subscribe */}
          <Grid item xs={6} sm={3}>
            <Typography
              variant="subtitle1"
              fontWeight={600}
              color="white"
              gutterBottom
              sx={{ mb: 2.5 }}
            >
              Subscribe
            </Typography>
            <Typography variant="body2" sx={{ mb: 2.5, lineHeight: 1.6 }}>
              Stay updated with the latest news and offers!
            </Typography>

            <TextField
              fullWidth
              placeholder="Enter your email address"
              variant="outlined"
              size="small"
              sx={{
                mb: 2,
                '& .MuiOutlinedInput-root': {
                  borderRadius: 50,
                  bgcolor: 'grey.900',
                  color: 'white',
                  '& fieldset': { borderColor: 'grey.700' },
                  '&:hover fieldset': { borderColor: 'grey.500' },
                  '&.Mui-focused fieldset': { borderColor: 'primary.main' },
                },
                '& .MuiInputBase-input::placeholder': {
                  color: 'grey.500',
                  opacity: 1,
                },
              }}
            />

            <Button
              variant="contained"
              fullWidth
              startIcon={<EmailIcon />}
              sx={{
                borderRadius: 50,
                py: 1.2,
                textTransform: 'none',
                fontWeight: 600,
                bgcolor: '#1976d2',
                '&:hover': { bgcolor: '#1565c0' },
              }}
            >
              Subscribe
            </Button>
          </Grid>
        </Grid>

        <Divider sx={{ my: 6, borderColor: 'grey.800' }} />

        {/* Bottom bar */}
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
            justifyContent: { xs: 'center', sm: 'space-between' },
            alignItems: 'center',
            gap: { xs: 3, sm: 0 },
          }}
        >
          {/* Logo + copyright */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
            {/* Replace this with your actual logo component / image */}
            <Box
              sx={{
                width: 38,
                height: 38,
                borderRadius: '50%',
                bgcolor: '#ffffff',
                color: 'white',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 900,
                fontSize: '1.6rem',
              }}
            >
              <img src={logo} alt="AreaConnect Logo" style={{ width: 32, height: 32 }} />
            </Box>

            <Typography
              variant="h6"
              fontWeight={700}
              sx={{ color: 'white', letterSpacing: '-0.5px' }}
            >
              AreaConnect
            </Typography>
          </Box>

          {/* Social icons */}
          <Box sx={{ display: 'flex', gap: 2 }}>
            <IconButton size="small" sx={{ color: 'grey.400' }}>
              <TwitterIcon fontSize="small" />
            </IconButton>
            <IconButton size="small" sx={{ color: 'grey.400' }}>
              <FacebookIcon fontSize="small" />
            </IconButton>
            <IconButton size="small" sx={{ color: 'grey.400' }}>
              <InstagramIcon fontSize="small" />
            </IconButton>
            <IconButton size="small" sx={{ color: 'grey.400' }}>
              <LinkedInIcon fontSize="small" />
            </IconButton>
          </Box>

          {/* Copyright & legal */}
          <Typography variant="caption" sx={{ color: 'grey.500', textAlign: 'center' }}>
            © {currentYear} VisCorner |{' '}
            <Link onClick={() => Navigate('/terms-of-service')} color="inherit" underline="hover">
              Terms of Service
            </Link>{' '}
            |{' '}
            <Link onClick={() => Navigate('/privacy-policy')} color="inherit" underline="hover">
              Privacy Policy
            </Link>
          </Typography>

          {/* Back to top (floating in original) */}
          <IconButton
            size="small"
            sx={{
              position: { xs: 'fixed', md: 'fixed' },
              bottom: 24,
              right: 24,
              bgcolor: '#1976d2',
              color: 'white',
              '&:hover': { bgcolor: '#1565c0' },
              zIndex: 1000,
              display: { xs: 'flex', md: 'flex' }, // usually hidden on mobile
            }}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            <KeyboardArrowUpIcon />
          </IconButton>
        </Box>
      </Container>
    </Box>
  );
}