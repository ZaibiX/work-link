"use client";

import React from "react";
import { Box, Typography, CircularProgress, Stack } from "@mui/material";

export default function GlobalLoading() {
  return (
    <Box 
      sx={{ 
        display: 'flex', 
        flexDirection: 'column',
        alignItems: 'center', 
        justifyContent: 'center', 
        minHeight: '80vh', // Centers it in the viewport
        width: '100%'
      }}
    >
      <Stack spacing={3} alignItems="center">
        {/* Animated Brand Logo/Name */}
        <Typography 
          variant="h4" 
          sx={{ 
            fontWeight: 900, 
            color: 'primary.main',
            letterSpacing: -1,
            animation: 'pulse 1.5s ease-in-out infinite',
            '@keyframes pulse': {
              '0%': { opacity: 0.6, transform: 'scale(0.98)' },
              '50%': { opacity: 1, transform: 'scale(1)' },
              '100%': { opacity: 0.6, transform: 'scale(0.98)' },
            }
          }}
        >
          WorkLink
        </Typography>

        {/* Modern Thinner Spinner */}
        <CircularProgress 
          size={40} 
          thickness={5} 
          sx={{ 
            color: 'primary.main',
            opacity: 0.8
          }} 
        />

        <Typography 
          variant="body2" 
          color="text.secondary" 
          sx={{ fontWeight: 600, letterSpacing: 1 }}
        >
          LOADING...
        </Typography>
      </Stack>
    </Box>
  );
}