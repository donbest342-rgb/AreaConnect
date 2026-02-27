import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Typography, Container, Grid, Card, CardContent, CardMedia,
  TextField, MenuItem, Select, FormControl, InputLabel,
  Rating, Button, Box, Divider, IconButton, Switch, FormControlLabel
} from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
// import axios from 'axios';
import api from '../api/axios.js'

const ServiceDirectory = () => {
  const navigate = useNavigate();

  const [search, setSearch] = useState('');
  const [location, setLocation] = useState('All');
  const [profession, setProfession] = useState('All');
  const [showFavsOnly, setShowFavsOnly] = useState(false);

  const [providers, setProviders] = useState([]);
  const [loading, setLoading] = useState(true);

  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem('local_pros_favs');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('local_pros_favs', JSON.stringify(favorites));
  }, [favorites]);

  // ✅ FETCH FROM BACKEND
  useEffect(() => {
  const fetchProviders = async () => {
    try {
      const response = await api.get("/providers/public"); // Adjust endpoint as needed
      console.log(response.data.data);

      // Adjust based on your backend response structure
      setProviders(response.data.data.providers || []);

    } catch (error) {
      console.error("Error fetching providers:", error);
    } finally {
      setLoading(false);
    }
  };

  fetchProviders();
}, []);

 const cities = [
  'All',
  ...new Set(
    providers
      .map(p => p.location?.split(', ')[1])
      .filter(Boolean)
  )
];

  const professions = [
  'All',
  ...new Set(
    providers
      .map(p => p.profession)
      .filter(Boolean)
  )
];

  const filteredData = useMemo(() => {
  return providers.filter(p => {
    const matchSearch =
      p.name?.toLowerCase().includes(search.toLowerCase()) ||
      p.profession?.toLowerCase().includes(search.toLowerCase());

    const matchCity =
      location === 'All' || p.location?.includes(location);

    const matchProf =
      profession === 'All' || p.profession === profession;

    const matchFav =
      showFavsOnly ? favorites.includes(p._id || p.id) : true;

    return matchSearch && matchCity && matchProf && matchFav;
  });
}, [providers, search, location, profession, showFavsOnly, favorites]);

  if (loading) {
    return (
      <div style={{ 
        height: '100vh', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center' 
      }}>
        <div>Loading Providers...</div>
        {/* or your <PageLoader /> component */}
      </div>
    );
  }

  return (
    <Box sx={{ flexGrow: 1, bgcolor: '#fbfcfd', minHeight: '100vh', pt: 4, pb: 8 }}>
      <Container maxWidth="lg">
        <Grid container spacing={4}>

          {/* Sidebar */}
          <Grid item xs={12} md={3}>
            <Box sx={{
              p: 3,
              bgcolor: 'white',
              borderRadius: 4,
              border: '1px solid #eef2f6',
              position: { md: 'sticky' },
              top: 20
            }}>
              <Typography variant="h6" fontWeight={800} color="#1a237e">
                Find a Pro
              </Typography>

              <FormControlLabel
                control={
                  <Switch
                    checked={showFavsOnly}
                    onChange={(e) => setShowFavsOnly(e.target.checked)}
                  />
                }
                label="Favorites Only"
              />

              <TextField
                fullWidth
                placeholder="Search..."
                size="small"
                sx={{ my: 2 }}
                onChange={(e) => setSearch(e.target.value)}
              />

              <FormControl fullWidth size="small" sx={{ mb: 2 }}>
                <InputLabel>Location</InputLabel>
                <Select
                  value={location}
                  label="Location"
                  onChange={(e) => setLocation(e.target.value)}
                >
                  {cities.map(c => (
                    <MenuItem key={c} value={c}>{c}</MenuItem>
                  ))}
                </Select>
              </FormControl>

              <FormControl fullWidth size="small">
                <InputLabel>Profession</InputLabel>
                <Select
                  value={profession}
                  label="Profession"
                  onChange={(e) => setProfession(e.target.value)}
                >
                  {professions.map(p => (
                    <MenuItem key={p} value={p}>{p}</MenuItem>
                  ))}
                </Select>
              </FormControl>

            </Box>
          </Grid>

          {/* Providers */}
          <Grid item xs={12} md={9}>
            <Grid container spacing={3} justifyContent="center">
              {filteredData.map((item) => (
                <Grid item xs={12} sm={6} key={item._id || item.id}
                  sx={{ display: 'flex', justifyContent: 'center' }}
                >
                  <Card sx={{
                    width: '100%',
                    maxWidth: { xs: 360, sm: '100%' },
                    borderRadius: 5,
                    position: 'relative',
                    textAlign: { xs: 'center', sm: 'left' }
                  }}>

                    <IconButton
                      onClick={() =>
                        setFavorites(prev =>
                          prev.includes(item._id || item.id)
                            ? prev.filter(f => f !== (item._id || item.id))
                            : [...prev, item._id || item.id]
                        )
                      }
                      sx={{
                        position: 'absolute',
                        top: 12,
                        right: 12,
                        bgcolor: 'white'
                      }}
                    >
                      {favorites.includes(item._id || item.id)
                        ? <FavoriteIcon color="error" />
                        : <FavoriteBorderIcon />}
                    </IconButton>

                    <CardMedia
                      component="img"
                      height="200"
                      image={item.avatar}
                    />

                    <CardContent>
                      <Typography variant="overline" color="primary" fontWeight={800}>
                        {item.profession}
                      </Typography>

                      <Typography variant="h6" fontWeight={800}>
                        {item.name}
                      </Typography>

                      <Box sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: { xs: 'center', sm: 'flex-start' },
                        mb: 1
                      }}>
                        <LocationOnIcon fontSize="small" sx={{ mr: 0.5 }} />
                        <Typography variant="body2">
                          {item.location}
                        </Typography>
                      </Box>

                      <Rating value={item.rating || 0} size="small" readOnly />

                      <Divider sx={{ my: 2 }} />

                      <Button
                        variant="contained"
                        fullWidth
                        onClick={() =>
                          navigate(`/profile/${item._id || item.id}`)
                        }
                      >
                        View Profile
                      </Button>
                    </CardContent>

                  </Card>
                </Grid>
              ))}
            </Grid>
          </Grid>

        </Grid>
      </Container>
    </Box>
  );
};

export default ServiceDirectory;