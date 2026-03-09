"use client";

import React, { useState } from "react";
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Avatar,
  Chip,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Pagination,
  Stack,
  Divider,
} from "@mui/material";
import LocationOnIcon from '@mui/icons-material/LocationOn';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { useRouter, useSearchParams } from 'next/navigation';

// Mock Data following your Prisma Schema structure (40 items for testing)
const GIGS_DATA = Array.from({ length: 40 }).map((_, i) => ({
  id: `${i + 1}`,
  title: [
    "Expert Solar Panel Installation & Cleaning",
    "Professional AC Gas Refilling",
    "Modern Kitchen Woodwork",
    "Emergency Leakage & Pipe Fix"
  ][i % 4],
  description: "Providing high-quality professional service with 6 months warranty. We ensure clean work and use genuine parts only.",
  price: 1500 + (i * 100),
  category: ["SOLAR_EXPERT", "AC_TECHNICIAN", "CARPENTER", "PLUMBER"][i % 4],
  city: ["Lahore", "Karachi", "Islamabad"][i % 3],
  area: ["Gulberg", "DHA Phase 5", "Bahria Town", "Saddar"][i % 4], // Added Area variable
  posted: `${i + 1}h ago`,
  worker: {
    user: {
      name: ["Zubair Khan", "Arsalan Arif", "Kamran Khan", "Sajid Ali"][i % 4]
    }
  }
}));

// Helper to clean up Prisma Enums (e.g., SOLAR_EXPERT -> Solar Expert)
const formatEnum = (text: string) => text.replace(/_/g, ' ').toLowerCase().replace(/\b\w/g, l => l.toUpperCase());

export default function GigsList() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  // State from URL or Defaults
  const [city, setCity] = useState(searchParams.get('location') || 'Lahore');
  const [category, setCategory] = useState(searchParams.get('category') || 'All');
  const [sort, setSort] = useState(searchParams.get('filter') || 'recent');

  // Logic for Pagination
  const PAGE_SIZE = 10;
  const currentPage = Number(searchParams.get('page')) || 1;
  const startIndex = (currentPage - 1) * PAGE_SIZE;
  const visibleGigs = GIGS_DATA.slice(startIndex, startIndex + PAGE_SIZE);

  const handlePagination = (event: React.ChangeEvent<unknown>, page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('filter', sort);
    params.set('location', city);
    params.set('category', category);
    params.set('page', page.toString());
    
    router.push(`/search/gigs?${params.toString()}`);
  };

  return (
    <Box>
      {/* FILTERS SECTION */}
      {/* <Stack 
        direction="row" 
        sx={{ mb: 4, flexWrap: "wrap", gap: 2, justifyContent: "flex-start" }}
      >
        <FormControl size="small" sx={{ minWidth: 150 }}>
          <InputLabel>City</InputLabel>
          <Select value={city} label="City" onChange={(e) => setCity(e.target.value)}>
            <MenuItem value="Lahore">Lahore</MenuItem>
            <MenuItem value="Karachi">Karachi</MenuItem>
            <MenuItem value="Islamabad">Islamabad</MenuItem>
          </Select>
        </FormControl>

        <FormControl size="small" sx={{ minWidth: 150 }}>
          <InputLabel>Category</InputLabel>
          <Select value={category} label="Category" onChange={(e) => setCategory(e.target.value)}>
            <MenuItem value="All">All Categories</MenuItem>
            <MenuItem value="CARPENTER">Carpenter</MenuItem>
            <MenuItem value="AC_TECHNICIAN">AC Tech</MenuItem>
            <MenuItem value="SOLAR_EXPERT">Solar Expert</MenuItem>
          </Select>
        </FormControl>

        <FormControl size="small" sx={{ minWidth: 150 }}>
          <InputLabel>Sort By</InputLabel>
          <Select value={sort} label="Sort By" onChange={(e) => setSort(e.target.value)}>
            <MenuItem value="recent">Most Recent</MenuItem>
            <MenuItem value="old">Oldest First</MenuItem>
          </Select>
        </FormControl>
      </Stack> */}

      {/* GIGS GRID */}
      <Grid container spacing={3}>
        {visibleGigs.map((gig) => (
          <Grid size={{ xs: 12, md: 6 }} key={gig.id} sx={{ display: 'flex' }}>
            <Card 
              elevation={0}
              sx={{ 
                width: '100%',
                borderRadius: 4, 
                border: '1px solid', 
                borderColor: 'divider',
                display: 'flex',
                flexDirection: 'column',
                transition: 'all 0.3s ease',
                '&:hover': {
                  borderColor: 'primary.main',
                  boxShadow: '0px 10px 25px rgba(99, 103, 255, 0.1)',
                  transform: 'translateY(-4px)'
                }
              }}
            >
              <CardContent sx={{ flexGrow: 1, p: 3 }}>
                {/* Top Row: Worker Info & Category */}
                <Stack direction="row" justifyContent="space-between" alignItems="flex-start" sx={{ mb: 2 }}>
                  <Stack direction="row" spacing={1.5} alignItems="center">
                    <Avatar sx={{ bgcolor: 'primary.light', color: 'primary.main', fontWeight: 700 }}>
                      {gig.worker.user.name[0]}
                    </Avatar>
                    <Box>
                      <Typography variant="subtitle2" sx={{ fontWeight: 800 }}>
                        {gig.worker.user.name}
                      </Typography>
                      {/* CHANGE 3: City | Area */}
                      <Typography variant="caption" color="text.secondary" sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                        <LocationOnIcon sx={{ fontSize: 14 }} /> {gig.city} | {gig.area}
                      </Typography>
                    </Box>
                  </Stack>
                  <Chip 
                    label={formatEnum(gig.category)} 
                    size="small" 
                    color="primary" 
                    variant="outlined"
                    sx={{ fontWeight: 700, borderRadius: 1.5 }} 
                  />
                </Stack>

                {/* Middle: Title & Description */}
                <Typography variant="h6" sx={{ fontWeight: 800, mb: 1, lineHeight: 1.3 }}>
                  {gig.title}
                </Typography>
                <Typography 
                  variant="body2" 
                  color="text.secondary" 
                  sx={{ 
                    mb: 2, 
                    display: '-webkit-box', 
                    WebkitLineClamp: 2, 
                    WebkitBoxOrient: 'vertical', 
                    overflow: 'hidden' 
                  }}
                >
                  {gig.description}
                </Typography>

                <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 2 }}>
                  <AccessTimeIcon sx={{ fontSize: 14, color: 'text.disabled' }} />
                  <Typography variant="caption" color="text.disabled" sx={{ fontWeight: 600 }}>
                    Posted {gig.posted}
                  </Typography>
                </Stack>

                <Divider sx={{ my: 2, borderStyle: 'dashed' }} />

                {/* Bottom: Price & Action */}
                <Stack direction="row" justifyContent="space-between" alignItems="center">
                  <Box>
                    {/* CHANGE 1: Hourly Rate Label */}
                    <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 600, display: 'block' }}>
                      Price / hr
                    </Typography>
                    <Typography variant="h6" sx={{ color: 'primary.main', fontWeight: 900 }}>
                      Rs. {gig.price.toLocaleString()}
                    </Typography>
                  </Box>
                  {/* CHANGE 2: View Detail Button */}
                  <Button 
                    variant="contained" 
                    disableElevation 
                    sx={{ borderRadius: 2.5, px: 3, fontWeight: 700, textTransform: 'none' }}
                  >
                    View Details
                  </Button>
                </Stack>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* PAGINATION */}
      {/* <Stack alignItems="center" sx={{ mt: 6 }}>
        <Pagination 
          count={Math.ceil(GIGS_DATA.length / PAGE_SIZE)} 
          page={currentPage}
          color="primary" 
          shape="rounded"
          onChange={handlePagination}
          sx={{ '& .MuiPaginationItem-root': { fontWeight: 700 } }} 
        />
      </Stack> */}
    </Box>
  );
}