import React from "react";
import { Box, Container, Typography, Divider, Stack } from "@mui/material";

export default function TermsOfService() {
  return (
    <Box sx={{ bgcolor: "#f9fafb", py: 6 }}>
      <Container maxWidth="md">
        <Typography variant="h3" fontWeight={700} gutterBottom>
          Terms of Service
        </Typography>

        <Typography variant="body2" color="text.secondary" gutterBottom>
          Last Updated: {new Date().getFullYear()}
        </Typography>

        <Divider sx={{ my: 3 }} />

        <Stack spacing={4}>
          <Section
            title="1. Introduction"
            content="Welcome to our Service Provider Marketplace. These Terms of Service govern your access to and use of our platform. By registering or using our services, you agree to be bound by these terms."
          />

          <Section
            title="2. User Accounts"
            content="Users may register as either Customers or Service Providers. You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account."
          />

          <Section
            title="3. Service Providers Responsibilities"
            content="Providers must deliver services professionally, accurately represent their skills, and comply with all applicable laws and regulations. Misrepresentation may result in account suspension or termination."
          />

          <Section
            title="4. Customer Responsibilities"
            content="Customers agree to provide accurate booking information and complete payments as agreed. Customers must treat service providers respectfully and professionally."
          />

          <Section
            title="5. Payments and Fees"
            content="Payments may include platform service fees. All transactions are processed securely through integrated payment providers. Refunds and disputes are handled in accordance with our refund policy."
          />

          <Section
            title="6. Reviews and Ratings"
            content="Customers may leave reviews based on actual completed services. Reviews must be honest and not defamatory, abusive, or misleading."
          />

          <Section
            title="7. Cancellations and Disputes"
            content="Bookings may be cancelled according to the platform’s cancellation policy. Disputes between users may be reviewed by our support team."
          />

          <Section
            title="8. Account Suspension"
            content="We reserve the right to suspend or terminate accounts that violate these Terms, engage in fraudulent activities, or compromise platform safety."
          />

          <Section
            title="9. Limitation of Liability"
            content="The platform acts as an intermediary between Customers and Providers. We are not directly responsible for service outcomes but strive to maintain a safe and reliable environment."
          />

          <Section
            title="10. Changes to Terms"
            content="We may update these Terms from time to time. Continued use of the platform after updates constitutes acceptance of the revised terms."
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
