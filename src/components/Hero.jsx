import React from 'react';
import { Box, Container, Typography, Button, Stack } from '@mui/material';
// import PhoneIcon from '@mui/icons-material/Phone';
import { motion } from 'framer-motion';
import Searchbar from './searchbar.jsx';

const fadeInUp = {
  hidden: { opacity: 0, y: 60 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8 } }
};

export default function HeroSection({ onContactClick }) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={fadeInUp}
      sx={{ bgcolor: 'grey', py: { xs: 10, md: 14 }, textAlign: 'center' }}
    >
      <Container maxWidth="md"
      sx={{
         pt: 4,
      }}>
        <Typography
          variant="h1"
          fontWeight={800}
          textAlign={'center'}
          sx={{
            fontSize: { xs: '2.8rem', md: '4.5rem' },
            lineHeight: 1.1,
            mb: 3
          }}
        >
          Find Trusted Local Professionals
        </Typography>

        <Typography
          variant="h5"
          color="text.secondary"
          textAlign={'center'}
          sx={{ mb: 6, maxWidth: 760, mx: 'auto' }}
        >
          Connect with verified service providers in your area. From appliance repair to house cleaning, find the right professional for your needs.
        </Typography>

        <Searchbar />

      </Container>
    </motion.div>
  );
}