"use client";

import React from "react";
import { 
  Box, 
  Typography, 
  Container, 
  Paper, 
  Avatar, 
  Grid,// Using the newer MUI Grid2
  Button
} from "@mui/material";
// import Grid from '@mui/material/Grid2';
// Icons
import HardwareIcon from '@mui/icons-material/Hardware';
import PlumbingIcon from '@mui/icons-material/Plumbing';
import AcUnitIcon from '@mui/icons-material/AcUnit';
import ElectricalServicesIcon from '@mui/icons-material/ElectricalServices';
import BrushIcon from '@mui/icons-material/Brush';
import CleaningServicesIcon from '@mui/icons-material/CleaningServices';
import ConstructionIcon from '@mui/icons-material/Construction';
import YardIcon from '@mui/icons-material/Yard';
import Link from 'next/link';

const categories = [
  { name: "Carpentry", icon: <HardwareIcon />, color: "#6367FF" },
  { name: "Plumbing", icon: <PlumbingIcon />, color: "#6367FF" },
  { name: "AC Tech", icon: <AcUnitIcon />, color: "#6367FF" },
  { name: "Electrical", icon: <ElectricalServicesIcon />, color: "#6367FF" },
  { name: "Painting", icon: <BrushIcon />, color: "#6367FF" },
  { name: "Cleaning", icon: <CleaningServicesIcon />, color: "#6367FF" },
  { name: "Masonry", icon: <ConstructionIcon />, color: "#6367FF" },
  { name: "Gardening", icon: <YardIcon />, color: "#6367FF" },
];

export default function TopCategories() {
  return (
    <Container maxWidth="lg" sx={{ py: 8 }}>
      <Box sx={{ mb: 5, textAlign: 'center' }}>
        <Typography variant="h4" component="h2" sx={{ fontWeight: 800, mb: 1 }}>
          Browse by Category
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Find the right expert for your specific needs
        </Typography>
      </Box>

      <Grid container spacing={{ xs: 2, sm: 3, md: 4 }}>
        {categories.map((cat, index) => (
          <Grid size={{ xs: 4, sm: 3, md: 3 }} key={index}>
            <Paper
              elevation={0}
              component={Link}
                href={`/categories/${cat.name.toLowerCase()}`}
              sx={{
                p: 2,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                cursor: 'pointer',
                // borderRadius: 4,
                border: '1px solid',
                // bgcolor:"yellow !important",
                borderColor: 'divider',
                backgroundColor: 'background.paper',
                transition: 'all 0.3s ease-in-out',
                // The Modern Hover Animation
                '&:hover': {
                  transform: 'translateY(-8px)',
                  borderColor: 'primary.main',
                  boxShadow: '0px 10px 30px rgba(99, 103, 255, 0.15)', // Electric Indigo Glow
                  '& .icon-avatar': {
                    backgroundColor: 'primary.main',
                    color: '#fff',
                  }
                },
              }}
            >
              <Avatar
                className="icon-avatar"
                sx={{
                  width: 60,
                  height: 60,
                  mb: 2,
                  bgcolor: 'rgba(99, 103, 255, 0.08)',
                  color: 'primary.main',
                  transition: 'all 0.3s ease',
                }}
              >
                {cat.icon}
              </Avatar>
              <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
                {cat.name}
              </Typography>
            </Paper>
          </Grid>
        ))}

        {/* <Grid size={{ xs: 4, sm: 3, md: 3 }} sx={{height:"100%"}} >
            <Paper
              elevation={0}
              component={Link}
                href={`/categories`}
              sx={{
                height: '100%',
                p: 2,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                cursor: 'pointer',
                // borderRadius: 4,
                border: '1px solid',
                // bgcolor:"yellow !important",
                borderColor: 'divider',
                backgroundColor: 'background.paper',
                transition: 'all 0.3s ease-in-out',
                // The Modern Hover Animation
                '&:hover': {
                  transform: 'translateY(-8px)',
                  borderColor: 'primary.main',
                  boxShadow: '0px 10px 30px rgba(99, 103, 255, 0.15)', // Electric Indigo Glow
                  '& .icon-avatar': {
                    backgroundColor: 'primary.main',
                    color: '#fff',
                  }
                },
              }}
            >
              
              <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
                View All Categories
              </Typography>
            </Paper>
          </Grid> */}
          <Grid size={{ xs: 4, sm: 6, md: 6 }} sx={{m:"auto"}}  >
            <Button component={Link} href="/categories" variant="outlined" fullWidth size="small" >
                View All Categories
            </Button>
          </Grid>
      </Grid>
    </Container>
  );
}