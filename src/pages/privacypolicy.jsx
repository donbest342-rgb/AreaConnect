import React from "react";
import { Box, Container, Typography, Divider, Stack } from "@mui/material";

export default function PrivacyPolicy() {
  return (
    <Box sx={{ bgcolor: "#f9fafb", py: 6 }}>
      <Container maxWidth="md">
        <Typography variant="h3" fontWeight={700} gutterBottom>
          Privacy Policy
        </Typography>

        <Typography variant="body2" color="text.secondary" gutterBottom>
          Last Updated: {new Date().getFullYear()}
        </Typography>

        <Divider sx={{ my: 3 }} />

        <Stack spacing={4}>
          <Section
            title="1. Information We Collect"
            content="We collect personal information such as name, email address, phone number, location, and payment details when you register or use our platform."
          />

          <Section
            title="2. How We Use Your Information"
            content="Your information is used to facilitate bookings, process payments, improve platform performance, and enhance user experience."
          />

          <Section
            title="3. Sharing of Information"
            content="We do not sell personal information. Data may be shared with payment processors, service providers, or authorities when required by law."
          />

          <Section
            title="4. Data Security"
            content="We implement industry-standard security measures to protect user data from unauthorized access, alteration, or disclosure."
          />

          <Section
            title="5. Cookies and Tracking"
            content="We may use cookies and analytics tools to improve platform performance and user experience."
          />

          <Section
            title="6. User Rights"
            content="Users may request access, correction, or deletion of their personal information by contacting our support team."
          />

          <Section
            title="7. Data Retention"
            content="We retain personal data only as long as necessary for operational, legal, or regulatory purposes."
          />

          <Section
            title="8. Third-Party Links"
            content="Our platform may contain links to third-party services. We are not responsible for the privacy practices of external websites."
          />

          <Section
            title="9. Changes to Policy"
            content="We may update this Privacy Policy periodically. Continued use of the platform after updates constitutes acceptance of the revised policy."
          />

          <Section
            title="10. Contact Us"
            content="If you have questions regarding this Privacy Policy, please contact our support team."
          />
        </Stack>
      </Container>
    </Box>
  );
}

function Section({ title, content }) {
  return (
    <Box>
      <Typography variant="h6" fontWeight={600} gutterBottom>
        {title}
      </Typography>
      <Typography variant="body1" color="text.secondary">
        {content}
      </Typography>
    </Box>
  );
}
