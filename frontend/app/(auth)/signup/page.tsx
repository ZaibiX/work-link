"use client";
import {useState} from "react";
import { TextField, Button, Box, Link as MuiLink, Stack, Typography } from "@mui/material";
import Link from "next/link";
import { AuthWrapper } from "@/components/authWrapper/AuthWrapper"; // adjust path
// import axiosInstance from "@/utils/axiosInstance";
import useAuth from "@/utils/store/authStore";
import EmailVerification from "@/components/emailVerification/emailVerification"; 
import {useRouter} from "next/navigation";


// async function handleGoogleSignup() {
//   try {
//     const response = await axiosInstance.get("/auth/google");
//     // Handle the response as needed
//     console.log(response.data);
//   } catch (error) {
//     console.error("Error during Google signup:", error);
//   }
// }

// async function handleLocalSignup(formData: { name: string; email: string; password: string; confirmPassword: string }) {
//   try {
//     if(formData.password !== formData.confirmPassword){
//       console.error("Passwords do not match");
//       return;
//     }
//     const response = await axiosInstance.post("/auth/register/local", {
//       name: formData.name,
//       email: formData.email,
//       password: formData.password,
//       confirmPassword: formData.confirmPassword,
//     });
//     // Handle the response as needed
//     console.log(response.data);
//   } catch (error) {
//     console.error("Error during local signup:", error);
//   }
// }

export default function SignupPage() {
const { registerLocal, loginGoogle, authLoading, verifyEmail, user } = useAuth();
const router = useRouter();
  const [formData, setFormData] = useState({ name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");
  const [showVerification, setShowVerification] = useState(false);
  

  async function handleRegisterLocal(){
    if(formData.password !== formData.confirmPassword){
      // console.error("Passwords do not match");
      setError("Passwords do not match");
      return;
    }
    try{
      const res = await registerLocal(formData.name, formData.email, formData.password);
      console.log("Registration response:", res.data.emailSent);
      if(res.data.emailSent){
       setShowVerification(true);
      return;
      }
    }
    catch(error:any){
      setError("Registration failed. Please try again.");
      console.error("Error during local signup:", error.response?.data?.message || error);
    }
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  }

  // if already loggedIn

  if(!authLoading && user){
    router.back();
    return;
  }
  if(authLoading){
    return <Typography variant="h6" align="center" sx={{ mt: 4 }}>Loading...</Typography>;
  }
  if(showVerification){
    return <EmailVerification email={formData.email} onVerify={verifyEmail} />
  }
  return (
    <AuthWrapper 
      title="Create your account" 
      subtitle="Get started and connect with experts"
      onGoogleClick={() => {console.log("Google Signup")
      loginGoogle();
      }}
    >
      <Box component="form" noValidate>
        <Stack spacing={2.5}>
          <TextField fullWidth label="Full Name" variant="outlined" name="name" onChange={handleChange} value={formData.name} />
          <TextField fullWidth label="Email Address" variant="outlined" type="email" name="email" onChange={handleChange} value={formData.email} />
          <TextField fullWidth label="Password" variant="outlined" type="password" name="password" onChange={handleChange} value={formData.password} />
          <TextField fullWidth label="Re-enter Password" variant="outlined" type="password" name="confirmPassword" onChange={handleChange} value={formData.confirmPassword} />
          
          <Typography variant="body2" color="error">
            {error}
          </Typography>
          <Button 
            fullWidth 
            variant="contained" 
            size="large" 
            sx={{ py: 1.5, borderRadius: 2, fontWeight: 700 }}
            onClick={handleRegisterLocal}
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