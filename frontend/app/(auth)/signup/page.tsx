"use client";
import React from "react";
import { TextField, Button, Box, Link as MuiLink, Stack, Typography } from "@mui/material";
import Link from "next/link";
import { AuthWrapper } from "@/components/authWrapper/AuthWrapper"; // adjust path

export default function SignupPage() {
  return (
    <AuthWrapper 
      title="Join WorkLink" 
      subtitle="Get started and connect with experts"
      onGoogleClick={() => console.log("Google Signup")}
    >
      <Box component="form" noValidate>
        <Stack spacing={2.5}>
          <TextField fullWidth label="Full Name" variant="outlined" />
          <TextField fullWidth label="Email Address" variant="outlined" type="email" />
          <TextField fullWidth label="Password" variant="outlined" type="password" />
          <TextField fullWidth label="Re-enter Password" variant="outlined" type="password" />
          
          <Button 
            fullWidth 
            variant="contained" 
            size="large" 
            sx={{ py: 1.5, borderRadius: 2, fontWeight: 700 }}
          >
            Sign Up
          </Button>

          <Typography variant="body2">
            Already have an account?{" "}
            <MuiLink component={Link} href="/login" sx={{ fontWeight: 700, color: 'primary.main' }}>
              Login Here
            </MuiLink>
          </Typography>
        </Stack>
      </Box>
    </AuthWrapper>
  );
}