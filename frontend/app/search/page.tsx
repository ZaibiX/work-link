"use client";
import React, { useState, useEffect } from "react";
import { Container, Box, Typography, Pagination, Stack } from "@mui/material";
import { useSearchParams } from 'next/navigation';
import FilterSection from "@/components/gigs/FilterSection";
import GigsList from "@/components/gigs/Gigs";
import GigsSkeleton from "@/components/gigs/GigsSkeleton";

export default function SearchPage() {
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(true);

  // Simulate Fetching Delay when filters change
  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => setLoading(false), 1200); // Simulated network delay
    return () => clearTimeout(timer);
  }, [searchParams]);

  return (
    <Container maxWidth="lg" sx={{ py: 6 }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" sx={{ fontWeight: 900 }}>Search Opportunities</Typography>
        <Typography variant="body2" color="text.secondary">
          Showing results for "{searchParams.get('q') || 'All Services'}" in {searchParams.get('location') || 'Lahore'}
        </Typography>
      </Box>

      <FilterSection searchParams={searchParams} />

      {loading ? (
        <GigsSkeleton />
      ) : (
        <>
          <GigsList />
          <Stack alignItems="center" sx={{ mt: 6 }} >
            <Pagination count={10} color="secondary" shape="rounded" size="large" />
          </Stack>
        </>
      )}
    </Container>
  );
}