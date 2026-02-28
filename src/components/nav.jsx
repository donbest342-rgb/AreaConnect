import React, { useState } from 'react';
import {
  AppBar, Toolbar, Typography, Button, IconButton, Box, Stack, Container
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/craiyon_171621_image.png';

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const Navigate = useNavigate();


  return (
    <AppBar position="sticky" color="transparent onClick={() => Navigate('/')}" elevation={0} sx={{
      bgcolor: 'white',
      borderBottom: '1px solid',
      borderColor: 'grey.200'
    }}>
      <Container maxWidth="lg">
        <Toolbar disableGutters sx={{ justifyContent: 'space-between' }}>
          
            <img src={logo} alt="AreaConnect Logo"  style={{ height: 60, cursor: 'pointer' }} onClick={() => Navigate('/')} />
        

          <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 4 }}>
              <Typography sx={{ cursor: 'pointer'}}  onClick={() => Navigate('/workers')}>Providers</Typography>
              <Typography sx={{ cursor: 'pointer'}}  onClick={() => Navigate('/estimates')}>Cost Estimate</Typography>
              <Typography sx={{ cursor: 'pointer'}}  onClick={() => Navigate('/register')}>Offer Your Services</Typography>
          </Box>

          <Button
            variant="outlined"
            size="medium"
            onClick={() => Navigate('/login')}
            sx={{ display: { xs: 'none', md: 'block', borderRadius: '20px',  cursor: 'pointer' } }}
          >
            login
          </Button>

          <IconButton
            sx={{ display: { md: 'none' } }}
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <CloseIcon /> : <MenuIcon />}
          </IconButton>
        </Toolbar>

        {mobileOpen && (
          <Box sx={{ display: { md: 'none' }, py: 2, bgcolor: 'white', width: '70%', right: 0, position: 'absolute', boxShadow: 3 }}>
            <Stack spacing={2} alignItems="center">
              <Button fullWidth onClick={() => Navigate('/workers')}>Providers</Button>
              <Button fullWidth onClick={() => Navigate('/estimates')}>Cost Estimate</Button>
              <Button fullWidth onClick={() => Navigate('/register')}>Offer Your Services</Button>
              <Button fullWidth onClick={() => Navigate('/login')}>login</Button>
            </Stack>
          </Box>
        )}
      </Container>
    </AppBar>
  );
}