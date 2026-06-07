import {useState} from 'react';
import { TextField, Stack, Button, Typography } from "@mui/material";
function EmailVerification(props: any) {
const [verificationCode, setVerificationCode] = useState("");
const [error, setError] = useState("");
async function handleVerification(){
  console.log("Attempting to verify email with code:", verificationCode, props.email);
    try{
        await props.onVerify(props.email, verificationCode);
    } catch(error:any){
        setError(error.response?.data?.message || error.message || "Unknown error");
        console.error("Error during email verification:", error.response?.data?.message || error.message || "Unknown error");
    }
}
  return (
    <Stack spacing={2} alignItems="center" sx={{ mt: 4, minHeight: "60vh", p:2 }}>
      <h1>Email Verification</h1>
      <p>Please check your email inbox and spam folder for a verification code.</p>
        <p>Enter the code below to verify your email:</p>
        <TextField type="text" placeholder="Verification Code" value={verificationCode} onChange={(e) => setVerificationCode(e.target.value)} size="small" />
          <Typography variant="body2" color="error">
            {error}
          </Typography>
        <Button onClick={() => {handleVerification()}}>Verify Email</Button>
    </Stack>
  );
}

export default EmailVerification;