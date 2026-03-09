"use client";

import React from "react";
import { 
  Container, Grid, Box, Typography, Stack, Avatar, 
  Chip, Button, Divider, Paper, Card, CardContent 
} from "@mui/material";
import LocationOnIcon from '@mui/icons-material/LocationOn';
import VerifiedIcon from '@mui/icons-material/Verified';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import PhoneIcon from '@mui/icons-material/Phone';
import StarIcon from '@mui/material/SvgIcon'; // Or use your Rating component

export default function GigDetailPage() {
  return (
    <Container maxWidth="lg" sx={{ py: 6 }}>
      <Grid container spacing={4}>
        
        {/* LEFT COLUMN: Gig Info */}
        <Grid >
          <Box sx={{ mb: 4 }}>
            <Chip 
              label="SOLAR EXPERT" 
              color="primary" 
              sx={{ fontWeight: 700, mb: 2, borderRadius: 1.5 }} 
            />
            <Typography variant="h3" sx={{ fontWeight: 900, mb: 2, lineHeight: 1.2 }}>
              Expert Solar Panel Installation & Cleaning
            </Typography>
            
            <Stack direction="row" spacing={2} alignItems="center">
              <Stack direction="row" spacing={0.5} alignItems="center">
                <LocationOnIcon color="action" fontSize="small" />
                <Typography variant="subtitle1" color="text.secondary" sx={{ fontWeight: 600 }}>
                  Lahore | Gulberg
                </Typography>
              </Stack>
              <Divider orientation="vertical" flexItem />
              <Typography variant="subtitle1" color="success.main" sx={{ fontWeight: 700 }}>
                Available Now
              </Typography>
            </Stack>
          </Box>

          <Paper variant="outlined" sx={{ p: 3, borderRadius: 4, mb: 4, bgcolor: 'grey.50', borderStyle: 'dashed' }}>
            <Typography variant="h6" sx={{ fontWeight: 800, mb: 2 }}>Service Description</Typography>
            <Typography variant="body1" color="text.secondary" sx={{ whiteSpace: 'pre-line' }}>
              We provide professional solar panel cleaning and installation services across Lahore. 
              Our team ensures that your panels are producing maximum energy by removing dust and grime 
              using specialized equipment. 
              {"\n\n"}
              • 6 Months Warranty on Installation{"\n"}
              • Inverter Troubleshooting included{"\n"}
              • Pressure washing for panels
            </Typography>
          </Paper>
        </Grid>

        {/* RIGHT COLUMN: Worker Profile & Pricing */}
        <Grid  >
          <Stack spacing={3}>
            
            {/* Pricing Card */}
            <Card elevation={0} sx={{ borderRadius: 4, border: '1px solid', borderColor: 'primary.main', bgcolor: 'primary.50' }}>
              <CardContent sx={{ p: 3 }}>
                <Typography variant="caption" sx={{ fontWeight: 800, color: 'primary.main' }}>HOURLY RATE</Typography>
                <Typography variant="h4" sx={{ fontWeight: 900, mb: 3 }}>Rs. 1,500</Typography>
                
                <Stack spacing={2}>
                  <Button 
                    variant="contained" 
                    fullWidth 
                    size="large" 
                    startIcon={<WhatsAppIcon />}
                    sx={{ borderRadius: 3, py: 1.5, fontWeight: 800, bgcolor: '#25D366', '&:hover': { bgcolor: '#128C7E' } }}
                  >
                    Chat on WhatsApp
                  </Button>
                  <Button 
                    variant="outlined" 
                    fullWidth 
                    size="large" 
                    startIcon={<PhoneIcon />}
                    sx={{ borderRadius: 3, py: 1.5, fontWeight: 800 }}
                  >
                    Call Worker
                  </Button>
                </Stack>
              </CardContent>
            </Card>

            {/* Worker Info Card */}
            <Paper variant="outlined" sx={{ p: 3, borderRadius: 4 }}>
              <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 2 }}>
                <Avatar sx={{ width: 60, height: 60, bgcolor: 'primary.main', fontSize: '1.5rem' }}>Z</Avatar>
                <Box>
                  <Typography variant="h6" sx={{ fontWeight: 800, display: 'flex', alignItems: 'center', gap: 0.5 }}>
                    Zubair Khan <VerifiedIcon color="info" sx={{ fontSize: 20 }} />
                  </Typography>
                  <Typography variant="body2" color="text.secondary">Member since 2023</Typography>
                </Box>
              </Stack>
              <Divider sx={{ my: 2 }} />
              <Stack direction="row" justifyContent="space-between">
                <Typography variant="body2" sx={{ fontWeight: 700 }}>Total Jobs</Typography>
                <Typography variant="body2" color="primary" sx={{ fontWeight: 700 }}>142</Typography>
              </Stack>
            </Paper>

          </Stack>
        </Grid>

      </Grid>
    </Container>
  );
}