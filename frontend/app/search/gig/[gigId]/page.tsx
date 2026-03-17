"use client";

import React, { useState, useEffect } from "react";
import { 
  Container, Box, Typography, Stack, Avatar, Chip, Button, 
  Divider, Paper, Grid, IconButton, Skeleton, Breadcrumbs, Link as MuiLink, Card, CardContent
} from "@mui/material";
import { 
  LocationOn, AccessTime, Phone, WhatsApp, ArrowBack, 
  CheckCircle, VerifiedUser, Star
} from '@mui/icons-material';
import { useRouter, useParams } from 'next/navigation';
import axiosInstance from "@/utils/axiosInstance";


const dummyGig:GigDetail = {
id:"223",
title: "Professional Solar Panel Deep Cleaning & Maintenance",

description: "Full cleaning service using specialized brushes. Includes inspection of wiring and mounting structure to ensure maximum energy efficiency.",

price: 2500,

category: "SOLAR_EXPERT",

city: "Lahore",

area: "DHA Phase 5, Sector L",

worker: {

user:{
  name: "Zubair Khan",
},

status: "AVAILABLE",

phone: "03129413650"

}

};
// Interface based on your DB structure
interface GigDetail {
  id: string;
  title: string;
  description: string;
  price: number;
  category: string;
  city: string;
  area: string;
  worker: {
    status: "AVAILABLE" | "BUSY";
    phone: string;
    user: {
      name: string;
    }
  }
}

const formatEnum = (text: string) => text?.replace(/_/g, ' ').toLowerCase().replace(/\b\w/g, l => l.toUpperCase()) || "";

export default function GigDetailPage() {
  const router = useRouter();
  const { id } = useParams(); // Gets ID from folder [id]
  const [gig, setGig] = useState<GigDetail | null>(dummyGig);
  const [loading, setLoading] = useState(false);

  // useEffect(() => {
  //   const fetchGigDetails = async () => {
  //     try {
  //       setLoading(true);
  //       // Assuming your backend route is GET /user/gigs/:id
  //       const response = await axiosInstance.get(`user/gigs/${id}`);
  //       setGig(response.data.data); // Adjust based on your API response structure
  //     } catch (error) {
  //       console.error("Error fetching gig:", error);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };
  //   if (id) fetchGigDetails();
  // }, [id]);

  if (loading) return <Container sx={{ py: 8 }}><Skeleton variant="rectangular" height={400} sx={{ borderRadius: 4 }} /></Container>;
  if (!gig) return <Container sx={{ py: 8 }}><Typography>Service not found.</Typography></Container>;

  return (
  <Container maxWidth="md" sx={{ py: 6 }}>
    {/* Simple Back Button */}
    <Button
      startIcon={<ArrowBack />}
      onClick={() => router.back()}
      sx={{ mb: 3, textTransform: 'none', fontWeight: 700, color: 'text.secondary' }}
    >
      Back to Gigs
    </Button>

    <Card 
      elevation={0}
      sx={{ 
        width: '100%',
        borderRadius: 4, 
        border: '1px solid', 
        borderColor: 'divider',
        bgcolor: 'background.paper',
      }}
    >
      <CardContent sx={{ p: { xs: 3, md: 5 } }}>
        {/* Top Row: Worker Info & Category (Exact same as GigsList) */}
        <Stack direction={{xs:"column", md:"row"}} justifyContent="space-between" alignItems="flex-start" sx={{ mb: 3,gap:1 }}>
          <Stack direction="row" spacing={1.5} alignItems="center" >
            <Avatar sx={{ bgcolor: 'primary.light', color: 'primary.main', fontWeight: 700, width: 56, height: 56 }}>
              {gig.worker.user.name[0]}
            </Avatar>
            <Box>
              <Typography variant="h6" sx={{ fontWeight: 800 }}>
                {gig.worker.user.name}
              </Typography>
              <Typography variant="caption" color="text.secondary" sx={{ display: 'flex', alignItems: 'center', gap: 0.5, fontSize: '0.85rem',  }}>
                <LocationOn fontSize="inherit" /> <div>{gig.city} | {gig.area}</div>
              </Typography>
            </Box>
          </Stack>
          <Chip 
            label={formatEnum(gig.category)} 
            color="primary" 
            variant="outlined"
            sx={{ fontWeight: 700, borderRadius: 1.5, placeSelf:"flex-end" }} 
          />
        </Stack>

        {/* Middle: Title & Description */}
        <Typography variant="h5" sx={{ fontWeight: 700, mb: 2, lineHeight: 1.2 }}>
          {gig.title}
        </Typography>

        <Stack direction="row" spacing={2} sx={{ mb: 3 }}>
           <Chip 
              label={gig.worker.status} 
              size="small"
              color={gig.worker.status === "AVAILABLE" ? "success" : "error"}
              sx={{ fontWeight: 700 }}
            />
            {/* <Typography variant="body2" color="success.main" sx={{ display: 'flex', alignItems: 'center', gap: 0.5, fontWeight: 700 }}>
                <VerifiedUser fontSize="small" /> Verified Worker
            </Typography> */}
        </Stack>

        <Typography variant="body1" color="text.secondary" sx={{ mb: 4, lineHeight: 1.8, fontSize: '1.05rem' }}>
          {gig.description}
        </Typography>

        <Typography variant="body1" color="text.secondary" sx={{ mb: 4, lineHeight: 1.8, fontSize: '1.05rem' }}>
          Contact: {gig.worker.phone}
        </Typography>

        <Divider sx={{ my: 4, borderStyle: 'dashed' }} />

        {/* Bottom: Price & Call Actions */}
        <Stack direction={{ xs: 'row', sm: 'row' }} justifyContent="space-between" alignItems={{ xs: 'center', sm: 'center' }} spacing={3}>
          <Box >
            <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 600, display: 'block',  }}>
              Price / hr
            </Typography>
            <Typography variant="h5" sx={{ color: 'primary.main', fontWeight: 900 }}>
              Rs. {gig.price.toLocaleString()}
            </Typography>
          </Box>

          <Stack direction="row" spacing={2} >
            <Button 
              variant="outlined" 
              color="success"
              startIcon={<WhatsApp />}
              href={`https://wa.me/${gig.worker.phone}`}
              target="_blank"
            >
              WhatsApp
            </Button>
            {/* <Button 
              variant="contained" 
              disableElevation 
              startIcon={<Phone />}
              href={`tel:${gig.worker.phone}`}
              sx={{ borderRadius: 2.5, px: 4, fontWeight: 700, textTransform: 'none', flex: 1 }}
            >
              Call {gig.worker.phone}
            </Button> */}
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  </Container>
);
}