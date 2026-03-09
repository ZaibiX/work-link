"use client";
import React from "react";
import { TextField, Button, Box, Link as MuiLink, Stack, Typography} from "@mui/material";
import Link from "next/link";
import { AuthWrapper } from "@/components/authWrapper/AuthWrapper"; // adjust path

export default function LoginPage() {
  return (
    <AuthWrapper 
      title="Welcome Back" 
      subtitle="Sign in to your WorkLink account"
      onGoogleClick={() => console.log("Google Login")}
    >
      <Box component="form" noValidate>
        <Stack spacing={2.5}>
          <TextField fullWidth label="Email Address" variant="outlined" type="email" />
          <TextField fullWidth label="Password" variant="outlined" type="password" />
          
          <Button 
            fullWidth 
            variant="contained" 
            size="large" 
            sx={{ py: 1.5, borderRadius: 2, fontWeight: 700 }}
          >
            Login
          </Button>

          <Typography variant="body2">
            Don't have an account?{" "}
            <MuiLink component={Link} href="/signup" sx={{ fontWeight: 700, color: 'primary.main' }}>
              Create Account
            </MuiLink>
          </Typography>
        </Stack>
      </Box>
    </AuthWrapper>
  );
}