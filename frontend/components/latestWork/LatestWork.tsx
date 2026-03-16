"use client";

import React, { useState } from "react";
import {
  Box,
  Typography,
  Container,
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
  Divider
} from "@mui/material";
import LocationOnIcon from '@mui/icons-material/LocationOn';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import CurrencyPkgIcon from '@mui/icons-material/Payments'; // Represents Rupees/Cash
import { useRouter, useSearchParams } from 'next/navigation';
import GigList from "@/components/gigs/Gigs";

// Mock Data
const MOCK_GIGS = Array.from({ length: 20 }).map((_, i) => ({
  id: i + 1,
  workerName: ["Zeeshan Ahmed", "Kamran Khan", "Bilal Butt", "Sajid Ali"][i % 4],
  title: ["Solar Panel Cleaning", "AC Gas Refill", "Kitchen Woodwork", "Emergency Leakage Fix"][i % 4],
  description: "Looking for a professional to handle urgent repair work at my residence in Gulberg.",
  price: 800 + (i * 50),
  category: ["Solar Expert", "AC Tech", "Carpenter", "Plumber"][i % 4],
  city: "Lahore",
  posted: "2 hours ago"
}));

export default function LatestOpportunities() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  // States for filters
  const [city, setCity] = useState(searchParams.get('location') || 'Lahore');
  const [category, setCategory] = useState(searchParams.get('category') || 'All');
  const [sort, setSort] = useState(searchParams.get('filter') || 'recent');

  const handlePagination = (event: React.ChangeEvent<unknown>, page: number) => {
    const params = new URLSearchParams();
    params.set('filter', sort);
    params.set('location', city);
    params.set('category', category);
    params.set('page', page.toString());
    
    router.push(`/search/gigs?${params.toString()}`);
  };

  return (
    <Container maxWidth="lg" sx={{ py: 8 }}>
      <Box sx={{ mb: 6 }}>
        <Typography variant="h4" sx={{ fontWeight: 900, mb: 1, color: 'text.primary' }}>
          Latest Work Opportunities
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Find and apply for available tasks in {city}
        </Typography>
      </Box>

      {/* FILTERS SECTION */}
      <Stack direction={{ xs: 'row', md: 'row' }} sx={{ mb: 4, flexWrap:"wrap",gap:2,justifyContent:"flex-start", }}>
        <FormControl size="small" sx={{ minWidth: 150 }}>
          <InputLabel>City</InputLabel>
          <Select value={city} label="City" onChange={(e) => setCity(e.target.value)}>
            <MenuItem value="Lahore">Lahore</MenuItem>
            <MenuItem value="Karachi">Karachi</MenuItem>
            <MenuItem value="Islamabad">Islamabad</MenuItem>
          </Select>
        </FormControl>

        <FormControl size="small" sx={{ minWidth: 150, }}>
          <InputLabel>Category</InputLabel>
          <Select value={category} label="Category" onChange={(e) => setCategory(e.target.value)}>
            <MenuItem value="All">All Categories</MenuItem>
            <MenuItem value="Carpenter">Carpenter</MenuItem>
            <MenuItem value="AC Tech">AC Tech</MenuItem>
            <MenuItem value="Solar Expert">Solar Expert</MenuItem>
          </Select>
        </FormControl>

        <FormControl size="small" sx={{ minWidth: 150,  }}>
          <InputLabel>Sort By</InputLabel>
          <Select value={sort} label="Sort By" onChange={(e) => setSort(e.target.value)}>
            <MenuItem value="recent">Most Recent</MenuItem>
            <MenuItem value="old">Oldest First</MenuItem>
          </Select>
        </FormControl>
      </Stack>

      {/* GIGS GRID */}
      <Grid container spacing={3}>
        {MOCK_GIGS.map((gig) => (
          <Grid size={{ xs: 12, md: 6 }} key={gig.id} sx={{ display: 'flex' }}>
            <Card 
              elevation={0} 
              sx={{ 
                width: '100%',
                borderRadius: 4, 
                border: '1px solid', 
                borderColor: 'divider',
                transition: '0.3s',
                '&:hover': { borderColor: 'primary.main', boxShadow: '0 8px 24px rgba(0,0,0,0.05)' }
              }}
            >
              <CardContent>
                <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 2 }}>
                  <Avatar sx={{ bgcolor: 'primary.light', width: 48, height: 48 }}>{gig.workerName[0]}</Avatar>
                  <Box>
                    <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>{gig.workerName}</Typography>
                    <Typography variant="caption" color="text.secondary" sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                      <AccessTimeIcon sx={{ fontSize: 14 }} /> {gig.posted}
                    </Typography>
                  </Box>
                  <Chip label={gig.category} size="small" color="primary" variant="outlined" sx={{ ml: 'auto', fontWeight: 600 }} />
                </Stack>

                <Typography variant="h6" sx={{ fontWeight: 800, mb: 1 }}>{gig.title}</Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 3, lineBreak: 'anywhere' }}>
                  {gig.description}
                </Typography>

                <Divider sx={{ mb: 2 }} />

                <Stack direction="row" justifyContent="space-between" alignItems="center">
                  <Box>
                    <Typography variant="caption" color="text.secondary" display="block">Price / hr</Typography>
                    <Typography variant="h6" sx={{ color: 'primary.main', fontWeight: 800 }}>
                      Rs. {gig.price}
                    </Typography>
                  </Box>
                  <Button variant="contained" disableElevation sx={{ borderRadius: 2, px: 3 }}>
                    View Details
                  </Button>
                </Stack>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* PAGINATION */}
      <Stack alignItems="center" sx={{ mt: 6 }}>
        <Pagination 
          count={5} 
          color="primary" 
          onChange={handlePagination}
          sx={{
            '& .MuiPaginationItem-root': { fontWeight: 700 }
          }} 
        />
      </Stack>
    </Container>
  );
}