import React from 'react';
import {
  Box,
  Typography,
  Grid,
  Paper,
  Stepper,
  Step,
  StepLabel,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import { motion } from 'framer-motion';

const steps = [
  {
    label: 'Make a request',
    description:
      'Tell us what you need to get done, and we will inform suitable pros around you.',
  },
  {
    label: 'Get responses',
    description:
      'In no time, you will receive up to 4 quotes from pros that match your needs.',
  },
  {
    label: 'Compare & hire',
    description:
      'Compare prices and read reviews to hire the right pro for you.',
  },
];

const HowItWorks = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <Box
      sx={{
        py: { xs: 8, md: 12 },
        px: { xs: 3, sm: 6, lg: 8 },
        bgcolor: 'grey.50',
        textAlign: 'center',
      }}
    >
      <Typography
        variant="h3"
        component="h2"
        fontWeight={700}
        gutterBottom
        sx={{
          mb: 2,
          fontSize: { xs: '2.1rem', sm: '2.6rem', md: '3.2rem' },
        }}
      >
        How it works?
      </Typography>

      {/* <Typography
        variant="body1"
        color="text.secondary"
        sx={{
          maxWidth: 720,
          mx: 'auto',
          mb: { xs: 6, md: 9 },
          fontSize: { xs: '1.05rem', md: '1.18rem' },
        }}
      >
        Post your job need → Get matched pros → Compare quotes & reviews → Hire the best fit
      </Typography> */}

      {/* Desktop / Tablet: Horizontal stepper style */}
      {!isMobile && (
        <Box sx={{ maxWidth: 1100, mx: 'auto', mt: 4 }}>
          <Stepper
            alternativeLabel
            activeStep={-1}
            connector={
              <Box
                sx={{
                  width: '100%',
                  height: 3,
                  position: 'relative',
                  '&:before': {
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    width: '33.33%',
                    transition: 'width 1.2s ease-out',
                  },
                }}
              />
            }
          >
            {steps.map((step, index) => (
              <Step key={step.label}>
                <StepLabel
                  StepIconProps={{
                    completed: true,
                    icon: (
                      <Box
                        sx={{
                          width: 56,
                          height: 56,
                          borderRadius: '50%',
                          bgcolor: 'primary.main',
                          color: 'white',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: '1.5rem',
                          fontWeight: 700,
                          boxShadow: '0 4px 14px rgba(25,118,210,0.3)',
                        }}
                      >
                        {index + 1}
                      </Box>
                    ),
                  }}
                >
                  <Box sx={{ pt: 4 }}>
                    <Typography
                      variant="h6"
                      fontWeight={700}
                      sx={{ mb: 1.5, color: 'primary.main' }}
                    >
                      {step.label}
                    </Typography>
                    <Typography
                      variant="body1"
                      color="text.secondary"
                      sx={{ maxWidth: 320, mx: 'auto' }}
                    >
                      {step.description}
                    </Typography>
                  </Box>
                </StepLabel>
              </Step>
            ))}
          </Stepper>
        </Box>
      )}

      {/* Mobile: Vertical stacked cards */}
      {isMobile && (
        <Box sx={{ mt: 4 }}>
          <Grid container spacing={4} direction="column">
            {steps.map((step, index) => (
              <Grid item xs={12} key={step.label}>
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.15, duration: 0.6 }}
                >
                  <Paper
                    elevation={3}
                    sx={{
                      p: 4,
                      borderRadius: 4,
                      border: '2px solid',
                      borderColor: 'primary.light',
                      position: 'relative',
                      overflow: 'hidden',
                      '&:before': {
                        content: `"${index + 1}"`,
                        position: 'absolute',
                        top: 16,
                        left: 16,
                        width: 44,
                        height: 44,
                        borderRadius: '50%',
                        bgcolor: 'primary.main',
                        color: 'white',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '1.4rem',
                        fontWeight: 700,
                        boxShadow: '0 4px 12px rgba(25,118,210,0.3)',
                      },
                    }}
                  >
                    <Box sx={{ pl: 9 }}>
                      <Typography
                        variant="h6"
                        fontWeight={700}
                        sx={{ mb: 1.5, color: 'primary.main' }}
                      >
                        {step.label}
                      </Typography>
                      <Typography variant="body1" color="text.secondary">
                        {step.description}
                      </Typography>
                    </Box>
                  </Paper>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </Box>
      )}
    </Box>
  );
};

export default HowItWorks;