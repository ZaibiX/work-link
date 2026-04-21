"use client";
import {useState} from "react";
import { TextField, Button, Box, Link as MuiLink, Stack, Typography } from "@mui/material";
import Link from "next/link";
import { AuthWrapper } from "@/components/authWrapper/AuthWrapper"; // adjust path
import axiosInstance from "@/utils/axiosInstance";

async function handleGoogleSignup() {
  try {
    const response = await axiosInstance.get("/auth/google");
    // Handle the response as needed
    console.log(response.data);
  } catch (error) {
    console.error("Error during Google signup:", error);
  }
}

async function handleLocalSignup(formData: { name: string; email: string; password: string; confirmPassword: string }) {
  try {
    if(formData.password !== formData.confirmPassword){
      console.error("Passwords do not match");
      return;
    }
    const response = await axiosInstance.post("/auth/register/local", {
      name: formData.name,
      email: formData.email,
      password: formData.password,
      confirmPassword: formData.confirmPassword,
    });
    // Handle the response as needed
    console.log(response.data);
  } catch (error) {
    console.error("Error during local signup:", error);
  }
}

export default function SignupPage() {
  const [formData, setFormData] = useState({ name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  }
  return (
    <AuthWrapper 
      title="Create your account" 
      subtitle="Get started and connect with experts"
      onGoogleClick={() => {console.log("Google Signup")
      handleGoogleSignup();
      }}
    >
      <Box component="form" noValidate>
        <Stack spacing={2.5}>
          <TextField fullWidth label="Full Name" variant="outlined" name="name" onChange={handleChange} value={formData.name} />
          <TextField fullWidth label="Email Address" variant="outlined" type="email" name="email" onChange={handleChange} value={formData.email} />
          <TextField fullWidth label="Password" variant="outlined" type="password" name="password" onChange={handleChange} value={formData.password} />
          <TextField fullWidth label="Re-enter Password" variant="outlined" type="password" name="confirmPassword" onChange={handleChange} value={formData.confirmPassword} />
          
          <Button 
            fullWidth 
            variant="contained" 
            size="large" 
            sx={{ py: 1.5, borderRadius: 2, fontWeight: 700 }}
            onClick={() => handleLocalSignup(formData)}
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