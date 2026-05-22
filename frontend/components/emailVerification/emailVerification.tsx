import {useState} from 'react';
function EmailVerification(props: any) {
const [verificationCode, setVerificationCode] = useState("");

  return (
    <div>
      <h1>Email Verification</h1>
      <p>Please check your email for a verification code.</p>
        <p>Enter the code below to verify your email:</p>
        <input type="text" placeholder="Verification Code" value={verificationCode} onChange={(e) => setVerificationCode(e.target.value)} />
        <button>Verify Email</button>
    </div>
  );
}

export default EmailVerification;