"use client";
import {useState} from "react";
import { TextField, Button, Box, Link as MuiLink, Stack, Typography} from "@mui/material";
import Link from "next/link";
import { AuthWrapper } from "@/components/authWrapper/AuthWrapper"; // adjust path
import useAuth from "@/utils/store/authStore";


export default function LoginPage() {

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const {loginLocal, loginGoogle, authLoading} = useAuth();

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  }
  return (
    <AuthWrapper 
      title="Welcome Back" 
      subtitle="Sign in to your WorkLink account"
      onGoogleClick={() => {console.log("Google Login"); loginGoogle();}}
    >
      <Box component="form" noValidate>
        <Stack spacing={2.5}>
          <TextField fullWidth label="Email Address" variant="outlined" type="email" name="email" onChange={handleChange} value={formData.email} />
          <TextField fullWidth label="Password" variant="outlined" type="password" name="password" onChange={handleChange} value={formData.password} />
          
          <Button 
            fullWidth 
            variant="contained" 
            size="large" 
            sx={{ py: 1.5, borderRadius: 2, fontWeight: 700 }}
            onClick={() => loginLocal(formData.email, formData.password)}
            disabled={authLoading}
          >
            {authLoading?"Loading...":"Login"}
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