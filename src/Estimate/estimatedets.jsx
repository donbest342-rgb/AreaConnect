import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Box, Container, Paper, Typography, Button, Grid, Divider, Stack } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import estimatesData from './estimatesData.js';

const EstimateDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const estimate = estimatesData.find(e => e.id === id);

  if (!estimate) return <Typography>Estimate not found</Typography>;

  const total = estimate.laborCost + estimate.materialCost;

  return (
    <Box sx={{ bgcolor: 'white', minHeight: '100vh', py: 8 }}>
      <Container maxWidth="md">
        <Button startIcon={<ArrowBackIcon />} onClick={() => navigate(-1)} sx={{ mb: 4 }}>
          Back to Estimator
        </Button>

        <Paper variant="outlined" sx={{ p: { xs: 3, md: 6 }, borderRadius: 6 }}>
          <Typography variant="overline" color="primary" fontWeight={800}>Cost Breakdown</Typography>
          <Typography variant="h3" fontWeight={800} gutterBottom>{estimate.title}</Typography>
          
          <Box sx={{ bgcolor: '#f8f9fa', p: 3, borderRadius: 4, my: 4 }}>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Typography color="text.secondary">Estimated Duration</Typography>
                <Typography variant="h6" fontWeight={700}>{estimate.duration}</Typography>
              </Grid>
              <Grid item xs={6} sx={{ textAlign: 'right' }}>
                <Typography color="text.secondary">Total Estimate</Typography>
                <Typography variant="h4" color="success.main" fontWeight={900}>
                  ₦{total.toLocaleString()}
                </Typography>
              </Grid>
            </Grid>
          </Box>

          <Typography variant="h6" fontWeight={700} gutterBottom>Itemized Costs</Typography>
          <Stack spacing={2} sx={{ mb: 4 }}>
            <Stack direction="row" justifyContent="space-between">
              <Typography>Labor & Workmanship</Typography>
              <Typography fontWeight={700}>₦{estimate.laborCost.toLocaleString()}</Typography>
            </Stack>
            <Divider />
            <Stack direction="row" justifyContent="space-between">
              <Typography>Materials & Logistics</Typography>
              <Typography fontWeight={700}>₦{estimate.materialCost.toLocaleString()}</Typography>
            </Stack>
          </Stack>

          <Typography variant="h6" fontWeight={700} gutterBottom>Description</Typography>
          <Typography color="text.secondary" paragraph>
            {estimate.description}
          </Typography>

          <Box sx={{ mt: 6, p: 3, border: '1px dashed #ccc', borderRadius: 4 }}>
            <Typography variant="body2" color="text.secondary" textAlign="center">
              *Note: These are market average estimates. Actual costs may vary based on location and specific material quality choices.
            </Typography>
          </Box>
          
          <Button variant="contained" fullWidth size="large" sx={{ mt: 4, py: 2, borderRadius: 3 }}>
            Hire a Pro for this Project
          </Button>
        </Paper>
      </Container>
    </Box>
  );
};

export default EstimateDetails;