import React, { useState, useMemo } from "react";
import { motion } from "framer-motion";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Button,
  TextField,
  Chip,
  Stack,
  Divider,
} from "@mui/material";
import { ArrowBack, Home, Search } from "@mui/icons-material";

/**
 * COMPLETE HELP CENTER SYSTEM (MUI + INLINE STYLES)
 * -------------------------------------------------
 * No Tailwind CSS
 * Uses MUI components + sx (inline styling)
 */

export default function HelpCenterPage() {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("getting-started");
  const [selectedArticle, setSelectedArticle] = useState(null);

  const helpData = [
    {
      id: "getting-started",
      name: "Getting Started",
      description: "Learn how to use the marketplace effectively.",
      articles: [
        {
          id: "create-account",
          title: "How to Create an Account",
          content:
            "To create an account, click Sign Up, choose whether you are a Service Provider or Client, fill in your details, verify your email, and complete your profile setup.",
          tags: ["account", "registration"],
          lastUpdated: "Jan 2026",
        },
        {
          id: "complete-profile",
          title: "How to Complete Your Profile",
          content:
            "Add your profile photo, service category, location, pricing, and a professional description to increase visibility and trust.",
          tags: ["profile", "visibility"],
          lastUpdated: "Jan 2026",
        },
      ],
    },
    {
      id: "providers",
      name: "For Service Providers",
      description: "Guides for professionals offering services.",
      articles: [
        {
          id: "get-approved",
          title: "How Provider Approval Works",
          content:
            "After submitting required documents, our team reviews your profile. Once approved, your services become searchable in your selected location.",
          tags: ["approval", "verification"],
          lastUpdated: "Jan 2026",
        },
        {
          id: "receive-payments",
          title: "How to Receive Payments",
          content:
            "Payments are securely processed through the platform. Funds are released after job confirmation.",
          tags: ["payments", "earnings"],
          lastUpdated: "Jan 2026",
        },
      ],
    },
  ];

  const searchResults = useMemo(() => {
    if (!search.trim()) return null;
    const results = [];
    helpData.forEach((category) => {
      category.articles.forEach((article) => {
        if (
          article.title.toLowerCase().includes(search.toLowerCase()) ||
          article.tags.some((t) =>
            t.toLowerCase().includes(search.toLowerCase())
          )
        ) {
          results.push({ ...article, categoryName: category.name });
        }
      });
    });
    return results;
  }, [search]);

  const activeCategory = helpData.find(
    (cat) => cat.id === selectedCategory
  );

  const relatedArticles = selectedArticle
    ? activeCategory.articles.filter(
        (a) => a.id !== selectedArticle.id
      )
    : [];

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "#f5f6f8", p: 4 }}>
      <Box sx={{ maxWidth: 1200, mx: "auto" }}>
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
          <Typography variant="h3" fontWeight={700} align="center">
            Help Center
          </Typography>
          <Typography align="center" color="text.secondary" sx={{ mt: 1 }}>
            Find guides and answers for your marketplace experience
          </Typography>
        </motion.div>

        {/* Search */}
        <Box sx={{ maxWidth: 500, mx: "auto", mt: 4 }}>
          <TextField
            fullWidth
            placeholder="Search articles or topics"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setSelectedArticle(null);
            }}
            InputProps={{
              startAdornment: <Search sx={{ mr: 1, color: "text.secondary" }} />,
            }}
          />
        </Box>

        {/* Search Results */}
        {searchResults ? (
          <Card sx={{ mt: 4 }}>
            <CardContent>
              <Typography variant="h5" fontWeight={600} gutterBottom>
                Search Results ({searchResults.length})
              </Typography>

              {searchResults.length === 0 && (
                <Typography color="text.secondary">
                  No articles found
                </Typography>
              )}

              <Stack spacing={2}>
                {searchResults.map((article) => (
                  <Card
                    key={article.id}
                    variant="outlined"
                    sx={{ cursor: "pointer" }}
                    onClick={() => {
                      setSelectedArticle(article);
                      setSearch("");
                    }}
                  >
                    <CardContent>
                      <Typography variant="caption" color="text.secondary">
                        {article.categoryName}
                      </Typography>
                      <Typography fontWeight={600}>
                        {article.title}
                      </Typography>
                    </CardContent>
                  </Card>
                ))}
              </Stack>
            </CardContent>
          </Card>
        ) : (
          <Box sx={{ display: "grid", gridTemplateColumns: "280px 1fr", gap: 4, mt: 6 }}>
            {/* Sidebar */}
            <Card>
              <CardContent>
                <Stack spacing={1}>
                  {helpData.map((cat) => (
                    <Button
                      key={cat.id}
                      variant={selectedCategory === cat.id ? "contained" : "text"}
                      onClick={() => {
                        setSelectedCategory(cat.id);
                        setSelectedArticle(null);
                      }}
                      sx={{ justifyContent: "flex-start" }}
                    >
                      {cat.name}
                    </Button>
                  ))}
                </Stack>
              </CardContent>
            </Card>

            {/* Content */}
            <Card sx={{ minHeight: 420 }}>
              <CardContent>
                {!selectedArticle ? (
                  <>
                    <Typography variant="h5" fontWeight={600}>
                      {activeCategory.name}
                    </Typography>
                    <Typography color="text.secondary" sx={{ mb: 3 }}>
                      {activeCategory.description}
                    </Typography>

                    <Stack spacing={2}>
                      {activeCategory.articles.map((article) => (
                        <Card
                          key={article.id}
                          variant="outlined"
                          sx={{ cursor: "pointer" }}
                          onClick={() => setSelectedArticle(article)}
                        >
                          <CardContent>
                            <Typography fontWeight={600}>
                              {article.title}
                            </Typography>
                            <Typography variant="caption" color="text.secondary">
                              Updated {article.lastUpdated}
                            </Typography>
                          </CardContent>
                        </Card>
                      ))}
                    </Stack>
                  </>
                ) : (
                  <>
                    {/* Breadcrumb */}
                    <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 2 }}>
                      <Home fontSize="small" />
                      <Typography variant="caption">Help Center</Typography>
                      <Typography variant="caption">/</Typography>
                      <Typography variant="caption">{activeCategory.name}</Typography>
                    </Stack>

                    <Button
                      startIcon={<ArrowBack />}
                      onClick={() => setSelectedArticle(null)}
                    >
                      Back to Articles
                    </Button>

                    <Typography variant="h4" fontWeight={700} sx={{ mt: 2 }}>
                      {selectedArticle.title}
                    </Typography>

                    <Stack direction="row" spacing={1} sx={{ my: 2 }}>
                      {selectedArticle.tags.map((tag) => (
                        <Chip key={tag} label={tag} />
                      ))}
                    </Stack>

                    <Typography sx={{ lineHeight: 1.7 }}>
                      {selectedArticle.content}
                    </Typography>

                    {relatedArticles.length > 0 && (
                      <Box sx={{ mt: 4 }}>
                        <Divider sx={{ mb: 2 }} />
                        <Typography fontWeight={600} gutterBottom>
                          Related Articles
                        </Typography>
                        <Stack spacing={1}>
                          {relatedArticles.map((a) => (
                            <Button
                              key={a.id}
                              variant="text"
                              onClick={() => setSelectedArticle(a)}
                              sx={{ justifyContent: "flex-start" }}
                            >
                              {a.title}
                            </Button>
                          ))}
                        </Stack>
                      </Box>
                    )}
                  </>
                )}
              </CardContent>
            </Card>
          </Box>
        )}
      </Box>
    </Box>
  );
}
