import React, { useState, useEffect, useRef } from 'react';
import {
  Box, Container, Grid, Typography, Avatar, Button, Chip, Rating,
  Card, CardContent, CardMedia, Divider, Stack, Paper, IconButton, Dialog, DialogTitle, DialogContent, DialogActions, TextField
} from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import StarIcon from '@mui/icons-material/Star';
import MessageIcon from '@mui/icons-material/Message';
import PhoneIcon from '@mui/icons-material/Phone';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../api/axios.js'

// ──────────────────────────────────────────────
// Contact Modal
// ──────────────────────────────────────────────
const ContactModal = ({ open, onClose }) => {
  const schema = yup.object({
    name: yup.string().required('Name is required'),
    email: yup.string().email('Invalid email').required('Email is required'),
    phone: yup.string().required('Phone is required'),
    message: yup.string().min(10, 'Message too short').required('Message is required'),
  });

  const { register, handleSubmit, formState: { errors }, reset } = useForm({ resolver: yupResolver(schema) });

  const onSubmit = (data) => {
    console.log('Form submitted:', data);
    alert('Thank you! We will get back to you soon.');
    reset();
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Contact Provider</DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <TextField {...register('name')} label="Full Name" fullWidth margin="normal" error={!!errors.name} helperText={errors.name?.message} />
          <TextField {...register('email')} label="Email" fullWidth margin="normal" error={!!errors.email} helperText={errors.email?.message} />
          <TextField {...register('phone')} label="Phone Number" fullWidth margin="normal" error={!!errors.phone} helperText={errors.phone?.message} />
          <TextField {...register('message')} label="Your Message / Project Details" fullWidth multiline rows={4} margin="normal" error={!!errors.message} helperText={errors.message?.message} />
          <DialogActions sx={{ mt: 3 }}>
            <Button onClick={onClose}>Cancel</Button>
            <Button type="submit" variant="contained">Send Message</Button>
          </DialogActions>
        </form>
      </DialogContent>
    </Dialog>
  );
};

// ──────────────────────────────────────────────
// Testimonials Carousel
// ──────────────────────────────────────────────
const TestimonialsCarousel = ({ items }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const timeoutRef = useRef(null);

  const nextSlide = () => setActiveIndex(prev => (prev + 1) % items.length);
  const prevSlide = () => setActiveIndex(prev => (prev - 1 + items.length) % items.length);

  useEffect(() => {
    if (isPaused) return;
    timeoutRef.current = setTimeout(nextSlide, 6000);
    return () => clearTimeout(timeoutRef.current);
  }, [activeIndex, isPaused, items.length]);

  return (
    <Box sx={{ position: 'relative', maxWidth: 900, mx: 'auto', overflow: 'hidden', borderRadius: 3 }}
         onMouseEnter={() => setIsPaused(true)} onMouseLeave={() => setIsPaused(false)}>
      <Box sx={{ display: 'flex', transform: `translateX(-${activeIndex * 100}%)`, transition: 'transform 0.6s ease-in-out', width: `${items.length * 100}%` }}>
        {items.map((testimonial, index) => (
          <Box key={index} sx={{ minWidth: '100%', px: { xs: 1, sm: 3 }, boxSizing: 'border-box' }}>
            <Card elevation={0} sx={{ borderRadius: 4, boxShadow: '0 4px 20px rgba(0,0,0,0.06)', p: { xs: 3, md: 4 }, bgcolor: 'grey.50', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <Box>
                <Rating value={testimonial.rating} precision={0.1} readOnly size="small" />
                <Typography variant="body1" sx={{ mt: 2, fontStyle: 'italic', lineHeight: 1.7 }}>"{testimonial.text}"</Typography>
              </Box>
              <Stack direction="row" alignItems="center" spacing={2} sx={{ mt: 4 }}>
                <Avatar src={testimonial.avatar} alt={testimonial.name} sx={{ width: 56, height: 56 }} />
                <Box>
                  <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>{testimonial.name}</Typography>
                  <Typography variant="body2" sx={{ color: 'text.secondary' }}>{testimonial.role} • {testimonial.date}</Typography>
                </Box>
              </Stack>
            </Card>
          </Box>
        ))}
      </Box>

      <IconButton onClick={prevSlide} sx={{ position: 'absolute', top: '50%', left: 8, transform: 'translateY(-50%)', bgcolor: 'rgba(25, 118, 210, 0.7)', color: 'white', '&:hover': { bgcolor: 'primary.dark' } }}>
        <ArrowBackIosNewIcon fontSize="small" />
      </IconButton>
      <IconButton onClick={nextSlide} sx={{ position: 'absolute', top: '50%', right: 8, transform: 'translateY(-50%)', bgcolor: 'rgba(25, 118, 210, 0.7)', color: 'white', '&:hover': { bgcolor: 'primary.dark' } }}>
        <ArrowForwardIosIcon fontSize="small" />
      </IconButton>
    </Box>
  );
};

// ──────────────────────────────────────────────
// Profile Details Page
// ──────────────────────────────────────────────
const ProfileDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [providerData, setProviderData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [contactOpen, setContactOpen] = useState(false);

  const openContact = () => setContactOpen(true);
  const closeContact = () => setContactOpen(false);

  // Fetch provider data from API
  useEffect(() => {
  const fetchProvider = async () => {
    setLoading(true);
    try {
      const res = await api.get(`/providers/public/${id}`); // Correct endpoint
      console.log(res.data);

      // Adjust based on your backend response structure
      // For example, if backend returns { data: { provider: {...} } }
      setProviderData(res.data.data.provider || {});

    } catch (err) {
      console.error("Error fetching provider data:", err);
    } finally {
      setLoading(false);
    }
  };

  if (id) fetchProvider(); // Only fetch if id exists
}, [id]);

  if (loading) return <Typography variant="h6" sx={{ textAlign: 'center', py: 10 }}>Loading...</Typography>;
  if (!providerData) return (
    <Container sx={{ py: 10, textAlign: 'center' }}>
      <Typography variant="h5">Provider Not Found</Typography>
      <Button onClick={() => navigate(-1)} sx={{ mt: 2 }}>Go Back</Button>
    </Container>
  );

  // Example static testimonials (replace with real API if available)
  const testimonials = providerData.reviews || [];

  return (
    <Box sx={{ bgcolor: 'white', minHeight: '100vh', py: { xs: 4, md: 6 } }}>
      <Container maxWidth="lg">
        <Button startIcon={<ArrowBackIcon />} onClick={() => navigate(-1)} sx={{ mb: 4, textTransform: 'none' }}>Back to Directory</Button>

        {/* Header Hero Section */}
        <Paper elevation={0} sx={{ bgcolor: 'background.paper', borderRadius: 6, boxShadow: '0 8px 32px rgba(0,0,0,0.05)', p: { xs: 3, md: 6 }, textAlign: { xs: 'center', md: 'left' }, display: { md: 'flex' }, alignItems: 'center', gap: 6, border: '1px solid #f0f0f0' }}>
          <Avatar src={providerData.avatar} alt={providerData.name} sx={{ width: { xs: 140, md: 180 }, height: { xs: 140, md: 180 }, boxShadow: 3, mx: 'auto', mb: { xs: 2, md: 0 } }} />
          <Box sx={{ flex: 1 }}>
            <Typography variant="h3" sx={{ fontWeight: 700, mb: 1, fontSize: { xs: '2rem', md: '3rem' } }}>{providerData.name}</Typography>
            <Typography variant="h5" sx={{ color: 'primary.main', mb: 2, fontWeight: 500 }}>{providerData.profession}</Typography>

            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={3} sx={{ justifyContent: { xs: 'center', md: 'flex-start' }, mb: 3 }}>
              <Stack direction="row" alignItems="center" spacing={1}>
                <LocationOnIcon color="action" fontSize="small" />
                <Typography variant="body2">{providerData.location}</Typography>
              </Stack>
              <Stack direction="row" alignItems="center" spacing={1}>
                <StarIcon color="warning" fontSize="small" />
                <Typography variant="body2">{providerData.rating} ({providerData.reviewsCount} reviews)</Typography>
              </Stack>
            </Stack>

            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
              <Button onClick={openContact} variant="contained" size="large" startIcon={<MessageIcon />} sx={{ borderRadius: 2, px: 4 }}>Message</Button>
              <Button variant="outlined" size="large" startIcon={<PhoneIcon />} href={`tel:${providerData.phoneNumber || '000'}`} sx={{ borderRadius: 2, px: 4 }}>Call</Button>
            </Stack>
          </Box>
        </Paper>

        {/* About, Services & Portfolio */}
        <Grid container spacing={5} sx={{ mt: 2 }}>
          <Grid item xs={12} md={7}>
            <Typography variant="h5" sx={{ fontWeight: 700, mb: 2 }}>About</Typography>
            <Typography variant="body1" sx={{ color: 'text.secondary', lineHeight: 1.8 }} paragraph>{providerData.bio}</Typography>

            <Divider sx={{ my: 4 }} />

            <Typography variant="h5" sx={{ fontWeight: 700, mb: 3 }}>Services</Typography>
            <Grid container spacing={2}>
              {providerData.services?.map((service, index) => (
                <Grid item xs={12} key={index}>
                  <Card variant="outlined" sx={{ borderRadius: 3, p: 1 }}>
                    <CardContent>
                      <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
                        <Box>
                          <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>{service.title}</Typography>
                          <Typography variant="body2" color="text.secondary">{service.description}</Typography>
                        </Box>
                        <Chip label={service.price} color="success" variant="soft" size="small" />
                      </Stack>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Grid>

          <Grid item xs={12} md={5}>
            <Paper variant="outlined" sx={{ p: 3, borderRadius: 4, mb: 4, bgcolor: '#f8f9fa' }}>
              <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>Work with {providerData.name.split(' ')[0]}</Typography>
              <Typography variant="body2" color="text.secondary" paragraph>Typical response time: <b>Under 2 hours</b></Typography>
              <Button variant="contained" fullWidth size="large" sx={{ py: 1.5, borderRadius: 2 }}>Book Consultation</Button>
            </Paper>

            <Typography variant="h5" sx={{ fontWeight: 700, mb: 3 }}>Portfolio</Typography>
            <Grid container spacing={1}>
              {Array.isArray(providerData.portfolio)
                ? providerData.portfolio.map((img, i) => (
                    <Grid item xs={6} key={i}>
                      <CardMedia component="img" image={img} sx={{ height: 140, borderRadius: 2 }} />
                    </Grid>
                  ))
                : <Grid item xs={12}><CardMedia component="img" image={providerData.portfolio} sx={{ height: 240, borderRadius: 3 }} /></Grid>
              }
            </Grid>
          </Grid>
        </Grid>

        {/* Testimonials */}
        <Box sx={{ mt: 10, pb: 6 }}>
          <Typography variant="h4" sx={{ fontWeight: 700, textAlign: 'center', mb: 1 }}>Reviews</Typography>
          <Typography variant="body1" sx={{ color: 'text.secondary', textAlign: 'center', mb: 6 }}>What past clients are saying</Typography>
          <TestimonialsCarousel items={testimonials} />
        </Box>
      </Container>

      <ContactModal open={contactOpen} onClose={closeContact} />
    </Box>
  );
};

export default ProfileDetails;
