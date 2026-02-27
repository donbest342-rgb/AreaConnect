import React, { useState, useEffect, useRef } from 'react';
import {
  Box,
  TextField,
  IconButton,
  Button,
  InputAdornment,
  CircularProgress,
} from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

const SearchBar = () => {
  const [service, setService] = useState('');          // "What service do you need?"
  const [location, setLocation] = useState('');        // "Where do you need it?"
  const [predictions, setPredictions] = useState([]);  // Google suggestions
  const [loading, setLoading] = useState(false);
  const autocompleteServiceRef = useRef(null);
  const inputRef = useRef(null);

  // Load Google Maps script and Places library once
  useEffect(() => {
    if (window.google?.maps?.places) {
      autocompleteServiceRef.current = new window.google.maps.places.AutocompleteService();
      return;
    }

    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyAOVYRIgupAurZup5y1PRh8Ismb1A3lLao&libraries=places&callback=initMap`;
    script.async = true;
    script.onload = () => {
      autocompleteServiceRef.current = new window.google.maps.places.AutocompleteService();
    };
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  // Fetch place predictions when user types in location field
  const handleLocationChange = (e) => {
    const value = e.target.value;
    setLocation(value);

    if (!value || !autocompleteServiceRef.current) {
      setPredictions([]);
      return;
    }

    setLoading(true);

    autocompleteServiceRef.current.getPlacePredictions(
      {
        input: value,
        // Optional: restrict to Nigeria / Port Harcourt area
        componentRestrictions: { country: 'ng' },
        // types: ['(regions)'], // cities, states, etc. — change as needed
        // locationBias: new window.google.maps.Circle({...}) if you want radius bias
      },
      (predictions, status) => {
        setLoading(false);
        if (status === window.google.maps.places.PlacesServiceStatus.OK && predictions) {
          setPredictions(predictions);
        } else {
          setPredictions([]);
        }
      }
    );
  };

  // When user selects a suggestion
  const handleSelectPrediction = (prediction) => {
    setLocation(prediction.description);
    setPredictions([]); // hide dropdown

    // Optional: get full place details (lat/lng, etc.)
    // const placesService = new window.google.maps.places.PlacesService(inputRef.current);
    // placesService.getDetails({ placeId: prediction.place_id }, (place, status) => {
    //   if (status === window.google.maps.places.PlacesServiceStatus.OK) {
    //     console.log('Selected place:', place);
    //   }
    // });
  };

  const handleSearch = () => {
    console.log('Search submitted:', { service, location });
    // → Send to backend, filter providers, navigate to results page, etc.
    // Example: window.location.href = `/search?service=${service}&location=${location}`;
  };

  return (
    <Box
    color={'grey'}
      sx={{
        display: 'flex',
        alignItems: 'center',
        bgcolor: 'white',
        borderRadius: '50px',
        boxShadow: '2px 4px 20px rgba(0, 0, 0, 0.81)',
        overflow: 'hidden',
        maxWidth: { xs: '100%', md: '860px' },
        mx: 'auto',
        flexDirection: { xs: 'column', sm: 'row' },
        gap: { xs: 2, sm: 0 },
        p: { xs: 2, sm: 0 },
        m: 4,

      }}
    >
      {/* Service Field */}
      <TextField
        fullWidth
        variant="standard"
        placeholder="What service do you need?"
        value={service}
        onChange={(e) => setService(e.target.value)}
        InputProps={{
          disableUnderline: true,
          sx: {
            px: 4,
            py: 2.2,
            fontSize: '1.05rem',
            color: 'grey.800',
            '&::placeholder': { color: 'grey.500', opacity: 1 },
          },
        }}
        sx={{
          flex: 1,
          borderRight: { sm: '1px solid', xs: 'none' },
          borderColor: 'grey.200',
        }}
      />

      {/* Location Field with Autocomplete Dropdown */}
      <Box sx={{ position: 'relative', flex: 1 }}>
        <TextField
          inputRef={inputRef}
          fullWidth
          variant="standard"
          placeholder="Where do you need it?"
          value={location}
          onChange={handleLocationChange}
          InputProps={{
            disableUnderline: true,
            startAdornment: (
              <InputAdornment position="start">
                <LocationOnIcon sx={{ color: 'grey.600', ml: 1 }} />
              </InputAdornment>
            ),
            endAdornment: loading ? (
              <InputAdornment position="end">
                <CircularProgress size={20} sx={{ mr: 2 }} />
              </InputAdornment>
            ) : null,
            sx: {
              px: 3,
              py: 2.2,
              fontSize: '1.05rem',
              color: 'grey.800',
              '&::placeholder': { color: 'grey.500', opacity: 1 },
            },
          }}
        />

        {/* Dropdown Suggestions */}
        {predictions.length > 0 && (
          <Box
            sx={{
              position: 'absolute',
              top: '100%',
              left: 0,
              right: 0,
              bgcolor: 'white',
              borderRadius: '12px',
              boxShadow: '0 8px 32px rgba(0,0,0,0.15)',
              mt: 1,
              zIndex: 10,
              maxHeight: 320,
              overflowY: 'auto',
              border: '1px solid',
              borderColor: 'grey.200',
            }}
          >
            {predictions.map((pred) => (
              <Box
                key={pred.place_id}
                onClick={() => handleSelectPrediction(pred)}
                sx={{
                  px: 4,
                  py: 2,
                  cursor: 'pointer',
                  '&:hover': { bgcolor: 'grey.50' },
                  borderBottom: '1px solid',
                  borderColor: 'grey.100',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 2,
                }}
              >
                <LocationOnIcon fontSize="small" sx={{ color: 'grey.500' }} />
                <Box>
                  <div style={{ fontWeight: 500 }}>{pred.structured_formatting.main_text}</div>
                  <div style={{ fontSize: '0.875rem', color: 'grey.600' }}>
                    {pred.structured_formatting.secondary_text}
                  </div>
                </Box>
              </Box>
            ))}
          </Box>
        )}
      </Box>

      {/* Get Started Button */}
      <Button
        variant="contained"
        onClick={handleSearch}
        disabled={!service.trim() || !location.trim()}
        startIcon={<ArrowForwardIcon />}
        sx={{
          borderRadius: '50px',
          py: 1.8,
          px: { xs: 4, sm: 6 },
          fontSize: '1.05rem',
          textTransform: 'none',
          fontWeight: 600,
          minWidth: { xs: '100%', sm: '180px' },
          bgcolor: '#1976d2',
          '&:hover': { bgcolor: '#1565c0' },
        }}
      >
        Get Started
      </Button>
    </Box>
  );
};

export default SearchBar;