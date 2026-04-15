import express from 'express';
import { registerLocal, registerUserGoogle, loginLocal, handleGoogleCallback, logoutLocal } from '../controllers/auth.controller.js';
import passport from '../config/passport.js';
const authRouter = express.Router();

authRouter.post("/register/local", registerLocal);
// authRouter.post("/register/google", registerUserGoogle);
authRouter.post("/login/local", loginLocal);

authRouter.delete("/logout/local", logoutLocal);

// Google Auth
// 1. This starts the flow. 'scope' tells Google what data we want.
authRouter.get("/login/google", passport.authenticate("google", { 
    scope: ["profile", "email"] 
}));

// 2. This is the callback URL you set in Google Console and your Passport config.
authRouter.get("/google/callback", 
    passport.authenticate("google", { session: false, failureRedirect: "http://localhost:3000/login" }),
    handleGoogleCallback // This controller function will issue the JWT
);


export default authRouter;