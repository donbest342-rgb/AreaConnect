import React, { useState } from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  Stack,
  Divider,
  List,
  ListItem,
  ListItemText,
  Button,
  Tabs,
  Tab,
} from "@mui/material";
import {
  VerifiedUser,
  Payments,
  Chat,
  Report,
  LocationOn,
  ArrowBack,
  Security,
  Work,
} from "@mui/icons-material";
import { motion } from "framer-motion";

/**
 * CUSTOMER SAFETY TIPS PAGE (ROLE-BASED)
 * ---------------------------------------
 * - MUI + inline sx styling
 * - Tabs: Clients vs Providers
 * - Professional marketplace design
 */

export default function CustomerSafetyTipsPage() {
  const [role, setRole] = useState(0); // 0 = Client, 1 = Provider

  const clientSafety = [
    {
      title: "Verify Provider Profiles",
      icon: <VerifiedUser color="primary" />,
      points: [
        "Review ratings and customer feedback carefully.",
        "Ensure the provider has completed identity verification.",
        "Check experience level and service history.",
      ],
    },
    {
      title: "Use Secure Payments",
      icon: <Payments color="primary" />,
      points: [
        "Always pay through the platform’s secure system.",
        "Avoid off-platform transactions.",
        "Keep payment confirmations for records.",
      ],
    },
    {
      title: "Meet Safely",
      icon: <LocationOn color="primary" />,
      points: [
        "Schedule appointments during reasonable hours.",
        "Inform someone about service visits when necessary.",
        "Trust your instincts and cancel if uncomfortable.",
      ],
    },
  ];

  const providerSafety = [
    {
      title: "Verify Client Details",
      icon: <Security color="primary" />,
      points: [
        "Review client profiles before accepting jobs.",
        "Confirm job details clearly within the platform.",
        "Avoid accepting incomplete or suspicious requests.",
      ],
    },
    {
      title: "Communicate Professionally",
      icon: <Chat color="primary" />,
      points: [
        "Keep all conversations within platform chat.",
        "Avoid sharing personal contact details unnecessarily.",
        "Document agreements inside the system.",
      ],
    },
    {
      title: "Report & Protect Yourself",
      icon: <Report color="primary" />,
      points: [
        "Report abusive or inappropriate behavior immediately.",
        "Decline unsafe job requests.",
        "Contact support for assistance with disputes.",
      ],
    },
  ];

  const activeSafety = role === 0 ? clientSafety : providerSafety;

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "#f5f6f8", p: 4 }}>
      <Box sx={{ maxWidth: 1200, mx: "auto" }}>
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
          <Typography variant="h3" fontWeight={700} align="center">
            Safety Guidelines
          </Typography>
          <Typography
            align="center"
            color="text.secondary"
            sx={{ mt: 2, maxWidth: 700, mx: "auto" }}
          >
            We are committed to providing a secure environment for both
            clients and service providers. Follow these best practices to
            ensure a safe marketplace experience.
          </Typography>
        </motion.div>

        {/* Tabs */}
        <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
          <Tabs
            value={role}
            onChange={(e, newValue) => setRole(newValue)}
            indicatorColor="primary"
            textColor="primary"
          >
            <Tab icon={<Work />} label="For Clients" />
            <Tab icon={<VerifiedUser />} label="For Providers" />
          </Tabs>
        </Box>

        {/* Safety Sections */}
        <Grid container spacing={4} sx={{ mt: 4 }}>
          {activeSafety.map((section, index) => (
            <Grid item xs={12} md={6} key={index}>
              <motion.div whileHover={{ y: -4 }}>
                <Card sx={{ height: "100%" }}>
                  <CardContent>
                    <Stack
                      direction="row"
                      spacing={2}
                      alignItems="center"
                      sx={{ mb: 2 }}
                    >
                      {section.icon}
                      <Typography variant="h6" fontWeight={600}>
                        {section.title}
                      </Typography>
                    </Stack>

                    <Divider sx={{ mb: 2 }} />

                    <List>
                      {section.points.map((point, i) => (
                        <ListItem key={i} sx={{ py: 0.5 }}>
                          <ListItemText
                            primary={point}
                            primaryTypographyProps={{
                              fontSize: 14,
                              color: "text.secondary",
                            }}
                          />
                        </ListItem>
                      ))}
                    </List>
                  </CardContent>
                </Card>
              </motion.div>
            </Grid>
          ))}
        </Grid>

        {/* CTA */}
        <Card sx={{ mt: 6 }}>
          <CardContent>
            <Typography variant="h6" fontWeight={600} gutterBottom>
              Need Help or Want to Report an Issue?
            </Typography>
            <Typography color="text.secondary" sx={{ mb: 3 }}>
              Our support team is available to assist with safety concerns,
              disputes, or suspicious activities.
            </Typography>
            <Button variant="contained" startIcon={<ArrowBack />}>
              Go to Help Center
            </Button>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
}