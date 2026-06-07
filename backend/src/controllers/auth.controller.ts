import type { Request, Response } from "express";
import {prisma} from "../utils/prisma.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import mailer from "../config/mailer.js";
import { log } from "node:console";

export async function registerLocal(req: Request, res: Response)
{
    console.log("hello from register local");
    
    try{
        const {name, email, password} = req.body;

        // Check if user already exists
        const existingUser = await prisma.user.findUnique({
            where: { email },
        });

        if (existingUser && existingUser.isEmailVerified) {
            return res.status(400).json({ message: "User already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const verificationCode = Math.floor(100000 + Math.random() * 900000).toString(); // Generate a 6-digit code

        const verificationCodeExpiry = new Date(Date.now() + 15 * 60 * 1000); // Code expires in 15 minutes

        // Create new user
        const newUser = await prisma.user.upsert({
        where: { email },
        update: {
            name,
            password: hashedPassword, // Wipes out the adversary's password
            authStrategy: "LOCAL",
            verificationCode,
            verificationCodeExpiry,
            // Keep isEmailVerified as false
        },
        create: {
            name,
            email,
            password: hashedPassword,
            authStrategy: "LOCAL",
            verificationCode,
            verificationCodeExpiry,
            isEmailVerified: false,
        },
    });

        // Send verification email
        const mailOptions = {
            from: process.env.SMTP_USER,
            to: email,
            subject: "Verify your email for Worklink",
            text: `Your verification code is: ${verificationCode}. It expires in 15 minutes.`,
        };
        
        try {
            await mailer.sendMail(mailOptions);
        } catch (error) {
            console.error("Error sending verification email:", error);
            return res.status(500).json({ message: "Error sending verification email" });
        }

        return res.status(200).json({ message: "Please check your email for the verification code.", emailSent: true });
        

    }
    catch(error){
        console.error("Error registering user:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
}

export async function verifyEmail(req: Request, res: Response)
{
    // console.log("verifying email...")
    const { email, verificationCode } = req.body;
    try{
        const newUser = await prisma.user.findUnique({
            where: { email },
        });

        // console.log("New user from auth controller: ", newUser, verificationCode);
        if(!newUser){
            return res.status(400).json({ message: "Invalid email or verification code" });
        }

        if(newUser.verificationCode !== verificationCode || !newUser.verificationCodeExpiry || newUser.verificationCodeExpiry < new Date()){
            return res.status(400).json({ message: "Invalid or expired verification code" });
        }

        else if(newUser.verificationCode === verificationCode && newUser.verificationCodeExpiry && newUser.verificationCodeExpiry >= new Date()){
            await prisma.user.update({
                where: { email },
                data: {
                    isEmailVerified: true,
                    verificationCode: null,
                    verificationCodeExpiry: null,
                },
            });
            // creating jwt token
        const payload = { email: newUser.email, id: newUser.id, role: newUser.role };
        const options = { expiresIn: "1h" } as const;

        const token = jwt.sign(payload, process.env.JWT_SECRET!, options);
        // const token = jwt.sign({ email }, process.env.JWT_SECRET!, { expiresIn: "1h" });

        return res.status(201).cookie("jwt",token, { httpOnly: true, secure: process.env.NODE_ENV === "production", sameSite: "strict",maxAge:1000*60*60 }).json({ message: "User registered successfully", user: { id: newUser.id, email: newUser.email, role: newUser.role } });
            // return res.status(200).json({ message: "Email verified successfully" });
        }
    }
    catch(error){
        console.error("Error verifying email:", error);
        return res.status(500).json({ message: "Internal server error" });
    }

}

export async function registerUserGoogle(req: Request, res: Response)
{
    try{
        const {name, email} = req.body;

        // Check if user already exists
        const existingUser = await prisma.user.findUnique({
            where: { email },
        });

        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        // Create new user
        const newUser = await prisma.user.create({
            data: {
                name,
                email,
                authStrategy: "GOOGLE",
                password:"GOOGLE"
            },
        });

        return res.status(201).json({ message: "User registered successfully", user: { id: newUser.id, email: newUser.email, role: newUser.role } });

    }
    catch(error){
        console.error("Error registering user:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
}

export async function loginLocal(req: Request, res: Response){
    const {email, password} = req.body;
    console.log("Login attempt with email:", email, password);
    console.log("cookies: ",req.cookies);
    if(!email||!password){
        return res.status(400).json({ message: "Email and password are required" });
    }
    
    
    try{
        const user = await prisma.user.findUnique({
            where: { email },
        });
        if(!user || !user.isEmailVerified){
            return res.status(400).json({ message: "Invalid email or password" });
        }

        if(user.authStrategy !== "LOCAL"){
            return res.status(400).json({ message: `Please login using ${user.authStrategy}` });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if(!isPasswordValid){
            return res.status(400).json({ message: "Invalid email or password" });
        }

        // creating jwt token
        const payload = { email: user.email, id: user.id, role: user.role };
        const options = { expiresIn: "1h" } as const;

        const token = jwt.sign(payload, process.env.JWT_SECRET!, options);

        return res.status(200).cookie("jwt",token, { httpOnly: true, secure: process.env.NODE_ENV === "production", sameSite: "lax",maxAge:1000*60*60 }).json({ message: "Login successful", user: { id: user.id, email: user.email, role: user.role } });

    }catch(error){
        console.error("Error during login:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
}

export async function logoutLocal(req: Request, res: Response) {
    return res.status(200).clearCookie("jwt").json({ message: "Logged out successfully" });
}

export const handleGoogleCallback = (req: Request, res: Response) => {
    const user = req.user as any; // Passport attached the user found/created in your strategy

    // Create the JWT
    const payload = { email: user.email, id: user.id, role: user.role };
    const token = jwt.sign(payload, process.env.JWT_SECRET!, { expiresIn: "7d" });

    // Set cookie and redirect back to your frontend
    return res
        .cookie("jwt", token, { 
            httpOnly: true, 
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
        }).json({ message: "Google login successful", user: { id: user.id, email: user.email, role: user.role } });
        //.redirect("http://localhost:3000/dashboard"); // Redirect to your Worklink frontend
};

export function checkAuth(req: Request, res: Response)
{
    const token = req.cookies.jwt;
    if (!token) {
        // We return 200 (Success) because the "check" was successful
        // even if the result is "not logged in"
        return res.status(200).json({ 
            isAuthenticated: false, 
            user: null 
        });
    }

    try{
        const decoded= jwt.verify(token, process.env.JWT_SECRET!) as { email: string, id: number, role: string };
        return res.status(200).json({ message: "Authenticated", user: decoded, isAuthenticated: true, });
    }
    catch(error){
        console.error("Error verifying token:", error);
        return res.status(401).json({ message: "Unauthorized" , isAuthenticated: false});
    }
}