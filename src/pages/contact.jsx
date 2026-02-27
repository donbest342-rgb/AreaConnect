import React, { useState } from "react";
import {
  Box,
  Container,
  Typography,
  Grid,
  TextField,
  Button,
  Card,
  CardContent,
  Stack,
  Alert,
} from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import LocationOnIcon from "@mui/icons-material/LocationOn";

const ContactUs = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validate = () => {
    const newErrors = {};

    if (!form.name) newErrors.name = "Full name is required";
    if (!form.email) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(form.email))
      newErrors.email = "Enter a valid email address";
    if (!form.subject) newErrors.subject = "Subject is required";
    if (!form.message) newErrors.message = "Message is required";

    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});
    setLoading(true);

    // Simulate API request
    setTimeout(() => {
      setSubmitted(true);
      setLoading(false);
      setForm({ name: "", email: "", subject: "", message: "" });
    }, 1500);
  };

  return (
<Box sx={{ bgcolor: "#f4f7f9", minHeight: "100vh", py: { xs: 6, md: 10 } }}>
  <Container maxWidth="lg">
    {/* Header */}
    <Box sx={{ textAlign: "center", mb: 8 }}>
      <Typography
        variant="h3"
        fontWeight={900}
        sx={{ color: "#1a237e", mb: 2 }}
      >
        Contact Us
      </Typography>
      <Typography
        variant="body1"
        color="text.secondary"
        maxWidth={600}
        mx="auto"
      >
        Questions, feedback, or support? We’d love to hear from you.
      </Typography>
    </Box>

    {/* TOP ROW: Message + Contact Info */}
    <Grid container spacing={4} justifyContent="center">
      {/* Message Us (7 columns) */}
      <Grid item xs={12} md={7} >
        <Card sx={{ borderRadius: 3, boxShadow: "none", height: "100%" }}>
          <CardContent sx={{ p: 4 }}>
            <Typography variant="h5" fontWeight={800} gutterBottom>
              Send Us a Message
            </Typography>

            {submitted && (
              <Alert severity="success" sx={{ mb: 3 }}>
                Message sent successfully! We’ll get back to you soon.
              </Alert>
            )}

            <Stack spacing={3} component="form" onSubmit={handleSubmit}>
              <TextField
                label="Full Name"
                name="name"
                value={form.name}
                onChange={handleChange}
                error={!!errors.name}
                helperText={errors.name}
                fullWidth
              />

              <TextField
                label="Email Address"
                name="email"
                value={form.email}
                onChange={handleChange}
                error={!!errors.email}
                helperText={errors.email}
                fullWidth
              />

              <TextField
                label="Subject"
                name="subject"
                value={form.subject}
                onChange={handleChange}
                error={!!errors.subject}
                helperText={errors.subject}
                fullWidth
              />

              <TextField
                label="Message"
                name="message"
                value={form.message}
                onChange={handleChange}
                error={!!errors.message}
                helperText={errors.message}
                multiline
                rows={4}
                fullWidth
              />

              <Button
                type="submit"
                variant="contained"
                size="large"
                disabled={loading}
                sx={{
                  alignSelf: "flex-start",
                  px: 4,
                  fontWeight: 700,
                  textTransform: "none",
                }}
              >
                {loading ? "Sending..." : "Send Message"}
              </Button>
            </Stack>
          </CardContent>
        </Card>
      </Grid>

      {/* Contact Info (5 columns) */}
      <Grid item xs={12} md={5}>
        <Card sx={{ borderRadius: 3, boxShadow: "none", height: "100%" }}>
          <CardContent sx={{ p: 4 }}>
            <Typography variant="h6" fontWeight={800} gutterBottom>
              Contact Information
            </Typography>

            <Stack spacing={3} sx={{ mt: 2 }}>
              <Stack direction="row" spacing={2} alignItems="center">
                <EmailIcon color="primary" />
                <Typography>support@neighborly.com</Typography>
              </Stack>

              <Stack direction="row" spacing={2} alignItems="center">
                <PhoneIcon color="primary" />
                <Typography>+234 800 123 4567</Typography>
              </Stack>

              <Stack direction="row" spacing={2} alignItems="center">
                <LocationOnIcon color="primary" />
                <Typography>Lagos, Nigeria</Typography>
              </Stack>
            </Stack>
          </CardContent>
        </Card>
      </Grid>
    </Grid>

    {/* MAP – FULL WIDTH BELOW */}
    <Box sx={{ mt: 6 }}>
      <Card
        sx={{
          borderRadius: 3,
          overflow: "hidden",
          boxShadow: "none",
        }}
      >
        <Box sx={{ height: { xs: 260, md: 360 }, width: "100%" }}>
          <iframe
            title="Neighborly Location"
            width="100%"
            height="100%"
            frameBorder="0"
            style={{ border: 0 }}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            src="https://www.google.com/maps?q=imo,Nigeria&output=embed"
          />
        </Box>
      </Card>
    </Box>
  </Container>
</Box>

  );
};

export default ContactUs;
