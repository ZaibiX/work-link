import express from 'express';
import { registerLocal, registerUserGoogle, loginLocal } from '../controllers/auth.controller.js';

const authRouter = express.Router();

authRouter.post("/register/local", registerLocal);
authRouter.post("/register/google", registerUserGoogle);
authRouter.post("/login/local", loginLocal);
// authRouter.post("/login", loginUser);

export default authRouter;