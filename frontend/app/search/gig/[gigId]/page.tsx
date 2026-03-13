"use client";

import React from "react";
import { 
  Container, Paper, Typography, Box, Button, Stack, 
  Divider, Chip, Avatar
} from "@mui/material";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import PhoneIcon from '@mui/icons-material/Phone';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { useRouter } from "next/navigation";

export default function GigDetailPage() {
  const router = useRouter();
  
  // Mock Data
  const gig = {
    title: "Professional Solar Panel Deep Cleaning & Maintenance",
    description: "Full cleaning service using specialized brushes. Includes inspection of wiring and mounting structure to ensure maximum energy efficiency.",
    price: 2500,
    category: "SOLAR_EXPERT",
    city: "Lahore",
    address: "DHA Phase 5, Sector L",
    worker: {
      name: "Zubair Khan",
      status: "AVAILABLE",
      phone: "03001234567"
    }
  };

  return (
    <Container maxWidth="sm" sx={{ py: 4 }}>
      <Button 
        onClick={() => router.back()} 
        startIcon={<ArrowBackIcon />} 
        sx={{ mb: 2, color: 'text.secondary', textTransform: 'none', fontWeight: 700 }}
      >
        Back
      </Button>

      <Paper 
        elevation={0} 
        sx={{ 
          p: 3, 
          borderRadius: 4, 
          border: '1px solid', 
          borderColor: 'divider' 
        }}
      >
        <Stack spacing={2.5}>
          {/* Header */}
          <Box>
            <Typography variant="caption" sx={{ fontWeight: 800, color: 'primary.main', textTransform: 'uppercase' }}>
              {gig.category.replace(/_/g, ' ')}
            </Typography>
            <Typography variant="h5" sx={{ fontWeight: 900, mt: 0.5 }}>
              {gig.title}
            </Typography>
          </Box>

          <Stack direction="row" justifyContent="space-between" alignItems="center">
            <Box>
              <Typography variant="h4" sx={{ fontWeight: 900, color: 'primary.main' }}>
                Rs. {gig.price}
              </Typography>
              <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 700 }}>
                PER VISIT / HOUR
              </Typography>
            </Box>
            <Chip 
              label={gig.worker.status} 
              color={gig.worker.status === "AVAILABLE" ? "success" : "default"}
              size="small"
              sx={{ fontWeight: 900, borderRadius: 1.5 }}
            />
          </Stack>

          <Divider />

          {/* Worker & Location */}
          <Stack direction="row" spacing={2} alignItems="center">
            <Avatar sx={{ bgcolor: 'primary.main', fontWeight: 800 }}>{gig.worker.name[0]}</Avatar>
            <Box>
              <Typography variant="subtitle1" sx={{ fontWeight: 800 }}>{gig.worker.name}</Typography>
              <Stack direction="row" alignItems="center" spacing={0.5} color="text.secondary">
                <LocationOnIcon sx={{ fontSize: 16 }} />
                <Typography variant="body2" sx={{ fontWeight: 600 }}>{gig.address}, {gig.city}</Typography>
              </Stack>
            </Box>
          </Stack>

          <Divider />

          {/* Description */}
          <Box>
            <Typography variant="subtitle2" sx={{ fontWeight: 800, mb: 0.5 }}>Service Description</Typography>
            <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.6 }}>
              {gig.description}
            </Typography>
          </Box>

          {/* Updated Action Area */}
          <Box sx={{ pt: 1 }}>
            <Stack spacing={1} alignItems="flex-start">
              <Button 
                variant="contained" 
                size="small" 
                startIcon={<PhoneIcon />}
                color="success"
                sx={{ 
                  px: 4,
                  py: 1, 
                  borderRadius: 2, 
                  fontWeight: 800, 
                  fontSize: '0.875rem', 
                  textTransform: 'none',
                  boxShadow: 'none',
                  
                }}
                onClick={() => window.location.href = `tel:${gig.worker.phone}`}
              >
                Call
              </Button>
              
              <Typography variant="body2" sx={{ color: 'text.secondary', fontWeight: 500, ml: 0.5 }}>
                Contact: {gig.worker.phone}
              </Typography>
            </Stack>
            
            <Typography variant="caption" display="block" sx={{ mt: 2, color: 'text.disabled', fontStyle: 'italic' }}>
              Directly contact the professional to book your service.
            </Typography>
          </Box>
        </Stack>
      </Paper>
    </Container>
  );
}