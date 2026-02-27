import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  Stack,
  Chip,
  Divider,
} from '@mui/material';

export default function AboutUs() {
  return (
    <Box bgcolor="#ffffff">
      {/* INTRO / HERO */}
      <Box
        sx={{
          background:
            'linear-gradient(180deg, #0f172a 0%, #020617 100%)',
          color: '#fff',
          py: { xs: 10, md: 14 },
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={6} alignItems="center">
            <Grid item xs={12} md={7}>
              <Chip
                label="Trusted Service Marketplace"
                sx={{
                  bgcolor: 'rgba(255,255,255,0.1)',
                  color: '#fff',
                  mb: 3,
                }}
              />
              <Typography
                variant="h3"
                fontWeight={700}
                gutterBottom
              >
                Connecting People to Reliable Local Experts
              </Typography>
              <Typography
                color="grey.300"
                fontSize={{ xs: '1rem', md: '1.1rem' }}
                maxWidth={560}
              >
                We make it simple to find skilled, verified professionals
                for home and business services — all within your
                neighbourhood.
              </Typography>
            </Grid>

            <Grid item xs={12} md={5}>
              <Card
                sx={{
                  borderRadius: 4,
                  bgcolor: '#020617',
                  color: '#fff',
                }}
              >
                <CardContent>
                  <Stack spacing={2}>
                    {[
                      'Verified professionals',
                      'Transparent pricing',
                      'Fast service delivery',
                      'Local expertise',
                    ].map((item) => (
                      <Stack
                        direction="row"
                        spacing={2}
                        key={item}
                        alignItems="center"
                      >
                        <Typography
                          color="success.main"
                          fontWeight={700}
                        >
                          ✓
                        </Typography>
                        <Typography>{item}</Typography>
                      </Stack>
                    ))}
                  </Stack>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* STORY */}
    <Box sx={{ py: { xs: 6, md: 10 }, bgcolor: "#fafafa" }}>
      <Container maxWidth="lg">
        <Typography
          variant="h4"
          align="center"
          fontWeight={700}
          gutterBottom
        >
          Why We Exist
        </Typography>

        <Typography
          align="center"
          color="text.secondary"
          sx={{ maxWidth: 700, mx: "auto", mb: 6 }}
        >
          Our mission is rooted in solving real problems for everyday people.
        </Typography>

        <Grid container spacing={4}>
          {[
    {
      title: "Create Trust",
      text: "We exist to build trust between service providers and customers through transparency and accountability.",
    },
    {
      title: "Empower Local Skills",
      text: "We help skilled professionals gain visibility and access to real job opportunities within their communities.",
    },
    {
      title: "Simplify Access",
      text: "Finding reliable services should be fast, simple, and stress-free — we make that possible.",
    },
  ].map((item, index) => (
            <Grid item xs={12} sm={4} md={4} key={index}>
              <Card
                elevation={0}
                sx={{
                  height: "100%",
                  borderRadius: 3,
                  border: "1px solid #eaeaea",
                }}
              >
                <CardContent sx={{ p: 4 }}>
                  <Typography
                    variant="h6"
                    fontWeight={600}
                    gutterBottom
                  >
                    {item.title}
                  </Typography>

                  <Typography color="text.secondary">
                    {item.text}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>

      {/* VALUES */}
      <Container maxWidth="lg" sx={{ py: { xs: 8, md: 12 } }}>
        <Typography
          variant="h4"
          fontWeight={600}
          textAlign="center"
          mb={6}
        >
          What Drives Us
        </Typography>

        <Grid container spacing={6}>
          {[
            {
              title: 'Trust',
              desc: 'Every provider is vetted to ensure reliability and quality.',
            },
            {
              title: 'Transparency',
              desc: 'Clear pricing, clear communication, no hidden surprises.',
            },
            {
              title: 'Community',
              desc: 'We support and grow local talent and businesses.',
            },
            {
              title: 'Excellence',
              desc: 'We continuously improve the experience for everyone.',
            },
          ].map((item) => (
            <Grid item xs={12} sm={6} md={3} key={item.title}>
              <Typography
                variant="h6"
                fontWeight={600}
                gutterBottom
              >
                {item.title}
              </Typography>
              <Typography color="text.secondary">
                {item.desc}
              </Typography>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* CTA */}
      <Box
        sx={{
          bgcolor: '#020617',
          color: '#fff',
          py: { xs: 8, md: 12 },
        }}
      >
        <Container maxWidth="md">
          <Stack spacing={4} textAlign="center">
            <Typography variant="h4" fontWeight={600}>
              Ready to Get Started?
            </Typography>
            <Typography color="grey.300">
              Whether you’re searching for a reliable service provider
              or you’re a professional ready to grow your business,
              we’re here to help.
            </Typography>

            <Divider sx={{ bgcolor: 'rgba(255,255,255,0.1)' }} />

            <Stack
              direction={{ xs: 'column', sm: 'row' }}
              spacing={2}
              justifyContent="center"
            >
              <Button
                size="large"
                variant="contained"
                sx={{
                  bgcolor: '#ffffff',
                  color: '#020617',
                  px: 5,
                  borderRadius: 2,
                  '&:hover': { bgcolor: '#e5e7eb' },
                }}
              >
                Find a Service
              </Button>
              <Button
                size="large"
                variant="outlined"
                sx={{
                  color: '#ffffff',
                  borderColor: '#ffffff',
                  px: 5,
                  borderRadius: 2,
                  '&:hover': {
                    bgcolor: '#ffffff',
                    color: '#020617',
                  },
                }}
              >
                Become a Provider
              </Button>
            </Stack>
          </Stack>
        </Container>
      </Box>
    </Box>
  );
}
