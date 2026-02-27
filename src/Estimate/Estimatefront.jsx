import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
  Grid,
  Typography,
  TextField,
  Card,
  CardContent,
  Button,
  Chip,
  Stack,
  InputAdornment,
  Divider,
  CardMedia
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import estimatesData from './estimatesData.js';


const EstimatesPage = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(0);
  const itemsPerPage = 9; // multiple of 3 for clean rows

  const filteredData = estimatesData.filter(item =>
    item.title.toLowerCase().includes(search.toLowerCase()) ||
    item.category.toLowerCase().includes(search.toLowerCase())
  );

  const paginatedData = filteredData.slice(
    page * itemsPerPage,
    (page + 1) * itemsPerPage
  );

  useEffect(() => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}, [page]);

  return (
    <Box sx={{ bgcolor: '#f4f7f9', minHeight: '100vh', py: 6 }}>
      <Container maxWidth="lg">
        {/* Header */}
        <Typography variant="h3" fontWeight={800} gutterBottom>
          Project Estimator
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
          Get a ballpark figure for your next home improvement project.
        </Typography>

        {/* Search */}
        <TextField
          fullWidth
          placeholder="Search for a service (e.g., Electrical, Tiling...)"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(0);
          }}
          sx={{ mb: 6, bgcolor: 'white', borderRadius: 2 }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon color="primary" />
              </InputAdornment>
            ),
          }}
        />

        {/* Cards Grid */}
        <Grid container spacing={4} justifyContent="center">
          {paginatedData.map((item) => (
            <Grid
              item
              key={item.id}
              xs={12}
              sm={6}
              md={4}
              sx={{ display: 'flex', justifyContent: 'center' }}
            >
              <Card
                sx={{
                  width: '100%',
                  maxWidth: 360,   // keeps cards centered
                  height: 420,     // 🔒 identical height
                  borderRadius: 3,
                  border: '1px solid #e5e9f0',
                  boxShadow: 'none',
                  display: 'flex',
                  flexDirection: 'column',
                  bgcolor: '#fff'
                }}
              >
                <CardMedia
                  component="img"
                  image={item.image}
                  alt={item.title}
                  sx={{
                    height: 180,   // 🔒 identical image height
                    objectFit: 'cover'
                  }}
                />

                <CardContent
                  sx={{
                    p: 3,
                    flexGrow: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between'
                  }}
                >
                  <Box>
                    <Chip
                      label={item.category}
                      size="small"
                      color="primary"
                      sx={{ mb: 1.5, fontWeight: 700 }}
                    />

                    <Typography variant="h6" fontWeight={700}>
                      {item.title}
                    </Typography>

                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{ mt: 0.5 }}
                      noWrap
                    >
                      {item.description}
                    </Typography>
                  </Box>

                  <Box>
                    <Divider sx={{ my: 2 }} />
                    <Stack
                      direction="row"
                      justifyContent="space-between"
                      alignItems="center"
                    >
                      <Box>
                        <Typography variant="caption" color="text.secondary">
                          Est. Total
                        </Typography>
                        <Typography
                          variant="h6"
                          fontWeight={800}
                          color="success.main"
                        >
                          ₦{(item.laborCost + item.materialCost).toLocaleString()}
                        </Typography>
                      </Box>

                      <Button
                        variant="outlined"
                        size="small"
                        onClick={() => navigate(`/estimate/${item.id}`)}
                        sx={{ textTransform: 'none', fontWeight: 600 }}
                      >
                        Details
                      </Button>
                    </Stack>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* Pagination */}
        <Stack direction="row" justifyContent="center" spacing={2} sx={{ mt: 6 }}>
          <Button
            disabled={page === 0}
            onClick={() => setPage(page - 1)}
            variant="outlined"
          >
            Previous
          </Button>
          <Button
            disabled={(page + 1) * itemsPerPage >= filteredData.length}
            onClick={() => setPage(page + 1)}
            variant="contained"
          >
            Next
          </Button>
        </Stack>
      </Container>
    </Box>
  );
};

export default EstimatesPage;
