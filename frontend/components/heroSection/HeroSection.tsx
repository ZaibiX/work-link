'use client';
import React from 'react';
import { Box, Container, Typography, TextField, Button, InputAdornment, } from '@mui/material';
import Grid from '@mui/material/Grid';
import SearchIcon from '@mui/icons-material/Search';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { useColorScheme } from "@mui/material/styles";


const HeroSection = () => {

   const { mode } = useColorScheme();

  const overlay =
    mode === "dark"
      ? "rgba(0,0,0,0.75)"
      : "rgba(255, 255, 255, 0.63)";

  return (
   <Box
      sx={{
        // width:{md:"100%"},
        position: "relative",
        backgroundImage:
          "url(./toolsbg.avif)",
        backgroundSize: "cover",
        backgroundPosition: "center 100%",
        // backgroundRepeat: "no-repeat",
        py: { xs: 6, md: 12 },
        // pb: { xs: 8, md: 26 },
        // p:"400px",
        minHeight: { xs: "90vh", md: "85vh" },

        "&::before": {
          content: '""',
          position: "absolute",
          inset: 0,
          backgroundColor: overlay,
          zIndex: 1,
        },
      }}
    >
      <Container
        maxWidth="lg"
        sx={{
          position: "relative",
          zIndex: 2,
          color: "common.white",
          // bgcolor:"pink",
        }}
      >
        {/* Your hero content */}

         <Box sx={{ display:"flex" ,justifyContent:"center", alignItems:"center", flexDirection:"column", }} >
            <Typography variant="h1" sx={{
              fontSize: { xs: '2.5rem', md: '4rem' },
              color: 'text.primary',
              mb: 2,
              lineHeight: 1.1
            }}>
              Expert help for <br />
              <span style={{ backgroundColor: "var(--mui-palette-secondary-dark)",
                paddingLeft: 10,
                paddingRight: 10,

                border:"3px solid var(--mui-palette-primary-main)",
                borderRadius:"15px",
               }}>any task</span>, instantly.
            </Typography>

            <Typography variant="h6" sx={{ color: 'text.secondary', mb: 5, fontWeight: 400, maxWidth: '500px' }}>
              Connect with local professionals for plumbing, electrical, cleaning, and more. Fast and reliable service at your fingertips.
            </Typography>

            {/* SEARCH BAR CARD */}
            <Box sx={{
              display: 'flex',
              flexDirection: { xs: 'column', sm: 'row' },
              // bgcolor: 'background.paper',
              p: 1,
              borderRadius: 3,
              boxShadow: '0px 12px 40px rgba(0,0,0,0.08)',
              gap: 1,
              // bgcolor:"yellow"
              bgcolor: "background.paper",
              width: { xs: '100%', md: '70%' },


            }}>
              <TextField
                fullWidth
                placeholder="What do you need help with?"
                variant="standard"
                sx={{
                  // bgcolor:"red"
                }}
                slotProps={{
                  input: {
                    disableUnderline: true,
                    startAdornment: (
                      <InputAdornment position="start">
                        <SearchIcon sx={{ color: 'primary.main',  }} />
                      </InputAdornment>
                    ),
                    sx: { height: '54px', px: 2 }
                  }
                }}
              />
              <Box sx={{ width: { xs: '100%', sm: '2px' }, height: { xs: '1px', sm: '40px' }, bgcolor: 'divider', my: 'auto' }} />

              <TextField
                placeholder="Lahore, PK"
                variant="standard"
                sx={{
                  // bgcolor:"green",
                  // mr:6,
                  width: { sm: "50%" }
                }}
                slotProps={{
                  input: {
                    disableUnderline: true,
                    startAdornment: (
                      <InputAdornment position="start">
                        <LocationOnIcon sx={{ color: 'text.secondary' }} />
                      </InputAdornment>
                    ),
                    sx: { height: '54px', px: 2, }
                  }

                }}
              />

              <Button
                variant="contained"
                size="large"
                sx={{
                  borderRadius: 3,
                  px: 4,
                  py: 1.5,
                  fontSize: '1rem',
                  // boxShadow: '0 4px 14px 0 rgba(99,103,255,0.39)'
                }}
              >
                Search
              </Button>
            </Box>

            <Typography variant="body2" sx={{ mt: 1,p:1, color: 'text.secondary',
              bgcolor:"background.paper", borderRadius:1, }}>

              <Typography component="span" variant="body2" sx={{color:"primary.main"}}> Popular: </Typography>
             Plumbing, AC Repair, Home Cleaning
            </Typography>
          </Box>
      </Container>
    </Box>
  );
};

export default HeroSection;