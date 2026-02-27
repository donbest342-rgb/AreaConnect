import React from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Button
} from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

const CostEstimates = () => {
  const estimates = [
    {
      service: 'Plumbing',
      averageCost: '15,000 - 50,000',
      description: 'Fixing leaks, unclogging drains, and fixture installs.',
      image: 'https://images.unsplash.com/photo-1581244277943-fe4a9c777189?auto=format&fit=crop&q=80&w=800'
    },
    {
      service: 'Electrical',
      averageCost: '10,000 - 40,000',
      description: 'Wiring, lighting installation, and urgent repairs.',
      image: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&q=80&w=800'
    },
    {
      service: 'House Cleaning',
      averageCost: '20,000 - 50,000',
      description: 'Deep interior and exterior residential cleaning.',
      image: 'https://images.unsplash.com/photo-1581578731548-c64695cc6954?auto=format&fit=crop&q=80&w=800'
    },
    {
      service: 'Pest Control',
      averageCost: '5,000 - 20,000',
      description: 'Management and elimination of common pests.',
      image: 'https://images.unsplash.com/photo-1590644365607-1c5a519a7a37?auto=format&fit=crop&q=80&w=800'
    },
    {
      service: 'Landscaping',
      averageCost: '10,000 - 50,000',
      description: 'Lawn care and modern outdoor landscape design.',
      image: 'https://images.unsplash.com/photo-1558905619-17153ad2739b?auto=format&fit=crop&q=80&w=800'
    },
    {
      service: 'Painting',
      averageCost: '15,000 - 40,000',
      description: 'Professional interior and exterior painting.',
      image: 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&q=80&w=800'
    }
  ];

  return (
    <Box sx={{ py: 10, bgcolor: '#fbfcfd' }}>
      <Container maxWidth="lg">
        {/* Header */}
        <Box sx={{ textAlign: 'center', mb: 6 }}>
          <Typography
            variant="overline"
            sx={{ color: 'primary.main', fontWeight: 700, letterSpacing: 2 }}
          >
            PRICING GUIDE
          </Typography>
          <Typography
            variant="h3"
            sx={{ fontWeight: 800, color: '#1a237e', mt: 1 }}
          >
            Explore Cost Estimates
          </Typography>
        </Box>

        {/* Cards */}
        <Grid container spacing={4} justifyContent="center">
          {estimates.map((item, index) => (
            <Grid
              item
              key={index}
              xs={12}   // Mobile: 1 column
              sm={6}    // Tablet: 2 columns
              md={4}    // Desktop: 3 columns
            >
              <Card
                sx={{
                  height: 420,            // 🔒 fixed height
                  display: 'flex',
                  flexDirection: 'column',
                  borderRadius: 3,
                  border: '1px solid #e5e9f0',
                  boxShadow: 'none'
                }}
              >
                <CardMedia
                  component="img"
                  image={item.image}
                  alt={item.service}
                  sx={{
                    height: 180,           // 🔒 fixed image height
                    objectFit: 'cover'
                  }}
                />

                <CardContent
                  sx={{
                    flexGrow: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    p: 3
                  }}
                >
                  <Box>
                    <Typography
                      variant="h6"
                      sx={{ fontWeight: 700, color: '#1a237e' }}
                    >
                      {item.service}
                    </Typography>

                    <Typography
                      variant="subtitle2"
                      sx={{ fontWeight: 600, color: 'success.main', mb: 1 }}
                    >
                      ₦{item.averageCost}
                    </Typography>

                    <Typography
                      variant="body2"
                      sx={{ color: 'text.secondary', lineHeight: 1.6 }}
                    >
                      {item.description}
                    </Typography>
                  </Box>

                  <Button
                    variant="outlined"
                    endIcon={<ArrowForwardIcon />}
                    sx={{
                      mt: 2,
                      alignSelf: 'flex-start',
                      textTransform: 'none',
                      fontWeight: 600,
                      borderRadius: 2
                    }}
                  >
                    Details
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default CostEstimates;
