import React from 'react';
import {
  Box,
  Grid,
  Typography,
  Button,
  Paper,
  Stack,
} from '@mui/material';
import MonetizationOnOutlinedIcon from '@mui/icons-material/MonetizationOnOutlined';
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined';
import { motion } from 'framer-motion';
import { Navigate, useNavigate } from 'react-router-dom';

// Reusable animation variants
const cardVariants = {
  hidden: { opacity: 0, y: 60, scale: 0.96 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.8,
      ease: 'easeOut',
    },
  },
};

const buttonVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: 0.3 },
  },
};

const JoinSection = () => {
  const Navigate = useNavigate();
  return (
    <Box
      sx={{
        py: { xs: 8, md: 12 },
        px: { xs: 3, sm: 6, lg: 0 },
        bgcolor: 'grey.50',
      }}
    >
      <Grid
        container
        spacing={{ xs: 5, sm: 6, md: 8 }}
        justifyContent="center"
        alignItems="stretch"
        sx={{
          maxWidth: '1400px',
          mx: 'auto',
        }}
      >
        {/* Left Card - Black */}
        <Grid item xs={12} sm={6}>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.25 }}
            variants={cardVariants}
            whileHover={{ scale: 1.02, transition: { duration: 0.3 } }}
          >
            <Paper
              elevation={8}
              sx={{
                height: '100%',
                borderRadius: 5,
                overflow: 'hidden',
                bgcolor: '#000000',
                color: 'white',
                display: 'flex',
                flexDirection: 'column',
                p: { xs: 5, sm: 6, md: 8 },
              }}
            >
              <Typography
                variant="h3"
                fontWeight={900}
                sx={{
                  fontSize: { xs: '1.9rem', sm: '2.4rem', md: '2.9rem' },
                  lineHeight: 1.15,
                  mb: 3,
                }}
              >
                Connect with
                <br />
                Experts You Can
                <br />
                Trust!
              </Typography>

              <Typography
                variant="body1"
                sx={{
                  fontSize: { xs: '1.05rem', md: '1.15rem' },
                  opacity: 0.9,
                  mb: 6,
                  maxWidth: 420,
                }}
              >
                Find qualified professionals for every project, big or small.
              </Typography>

              <Stack
                direction="row"
                spacing={{ xs: 4, md: 6 }}
                sx={{ mb: 'auto' }}
                alignItems="center"
                justifyContent="center"
              >
                <Stack alignItems="center">
                  <MonetizationOnOutlinedIcon sx={{ fontSize: { xs: 40, md: 52 }, mb: 1 }} />
                  <Typography variant="h5" fontWeight={800}>
                    ₦150M+
                  </Typography>
                  <Typography variant="body2" sx={{ opacity: 0.75, fontSize: '0.95rem' }}>
                    Worth of Services delivered
                  </Typography>
                </Stack>

                <Stack alignItems="center">
                  <PeopleAltOutlinedIcon sx={{ fontSize: { xs: 40, md: 52 }, mb: 1 }} />
                  <Typography variant="h5" fontWeight={800}>
                    17,000+
                  </Typography>
                  <Typography variant="body2" sx={{ opacity: 0.75, fontSize: '0.95rem' }}>
                    Professionals Available
                  </Typography>
                </Stack>
              </Stack>

              <motion.div variants={buttonVariants}>
                <Button
                  variant="contained"
                  size="large"
                  fullWidth
                  sx={{
                    mt: 6,
                    py: 2,
                    bgcolor: '#1976d2',
                    borderRadius: 50,
                    fontSize: '1.1rem',
                    fontWeight: 700,
                    textTransform: 'none',
                    boxShadow: '0 6px 24px rgba(25, 118, 210, 0.4)',
                    '&:hover': {
                      bgcolor: '#1565c0',
                      boxShadow: '0 10px 32px rgba(25, 118, 210, 0.5)',
                    },
                  }}
                  onClick={() => Navigate('/workers')}
                >
                  GET STARTED
                </Button>
              </motion.div>
            </Paper>
          </motion.div>
        </Grid>

        {/* Right Card - Blue */}
        <Grid item xs={12} sm={6}>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.25 }}
            variants={cardVariants}
            transition={{ delay: 0.15 }} // slight stagger
            whileHover={{ scale: 1.02, transition: { duration: 0.3 } }}
          >
            <Paper
              elevation={8}
              sx={{
                height: '100%',
                borderRadius: 5,
                overflow: 'hidden',
                bgcolor: '#1976d2',
                color: 'white',
                display: 'flex',
                flexDirection: 'column',
                p: { xs: 5, sm: 6, md: 8 },
              }}
            >
              <Typography
                variant="h3"
                fontWeight={900}
                sx={{
                  fontSize: { xs: '1.9rem', sm: '2.4rem', md: '2.9rem' },
                  lineHeight: 1.15,
                  mb: 3,
                }}
              >
                Join Our
                <br />
                Network of Top
                <br />
                Service Providers!
              </Typography>

              <Typography
                variant="body1"
                sx={{
                  fontSize: { xs: '1.05rem', md: '1.15rem' },
                  opacity: 0.9,
                  mb: 6,
                  maxWidth: 420,
                }}
              >
                Create your free profile and showcase your services to thousands of potential customers.
              </Typography>

              <Stack
                direction="row"
                spacing={{ xs: 4, md: 6 }}
                sx={{ mb: 'auto' }}
                alignItems="center"
                justifyContent="center"
              >
                <Stack alignItems="center">
                  <MonetizationOnOutlinedIcon sx={{ fontSize: { xs: 40, md: 52 }, mb: 1 }} />
                  <Typography variant="h5" fontWeight={800}>
                    ₦84M+
                  </Typography>
                  <Typography variant="body2" sx={{ opacity: 0.75, fontSize: '0.95rem' }}>
                    Earned by Pros
                  </Typography>
                </Stack>

                <Stack alignItems="center">
                  <PeopleAltOutlinedIcon sx={{ fontSize: { xs: 40, md: 52 }, mb: 1 }} />
                  <Typography variant="h5" fontWeight={800}>
                    2,500+
                  </Typography>
                  <Typography variant="body2" sx={{ opacity: 0.75, fontSize: '0.95rem' }}>
                    Customer Requests
                  </Typography>
                </Stack>
              </Stack>

              <motion.div variants={buttonVariants}>
                <Button
                  variant="contained"
                  size="large"
                  fullWidth
                  sx={{
                    mt: 6,
                    py: 2,
                    bgcolor: '#000000',
                    borderRadius: 50,
                    fontSize: '1.1rem',
                    fontWeight: 700,
                    textTransform: 'none',
                    boxShadow: '0 6px 24px rgba(0,0,0,0.45)',
                    '&:hover': {
                      bgcolor: '#222222',
                      boxShadow: '0 10px 32px rgba(0,0,0,0.55)',
                    },
                  }}
                  onClick={() => Navigate('/signup')}
                >
                  GET STARTED
                </Button>
              </motion.div>
            </Paper>
          </motion.div>
        </Grid>
      </Grid>
    </Box>
  );
};

export default JoinSection;