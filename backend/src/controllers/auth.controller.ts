import type { Request, Response } from "express";
import {prisma} from "../utils/prisma.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export async function registerLocal(req: Request, res: Response)
{
    try{
        const {name, email, password} = req.body;

        // Check if user already exists
        const existingUser = await prisma.user.findUnique({
            where: { email },
        });

        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        

        // Create new user
        const newUser = await prisma.user.create({
            data: {
                name,
                email,
                password: hashedPassword,
                authStrategy: "LOCAL",
            },
        });

        // creating jwt token
        const payload = { email: newUser.email, id: newUser.id };
        const options = { expiresIn: "1h" } as const;

        const token = jwt.sign(payload, process.env.JWT_SECRET!, options);
        // const token = jwt.sign({ email }, process.env.JWT_SECRET!, { expiresIn: "1h" });

        return res.status(201).cookie("jwt",token, { httpOnly: true, secure: process.env.NODE_ENV === "production", sameSite: "strict",maxAge:1000*60*60 }).json({ message: "User registered successfully", userId: newUser.id,  });

    }
    catch(error){
        console.error("Error registering user:", error);
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

        return res.status(201).json({ message: "User registered successfully", userId: newUser.id });

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
        if(!user){
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
        const payload = { email: user.email, id: user.id };
        const options = { expiresIn: "1h" } as const;

        const token = jwt.sign(payload, process.env.JWT_SECRET!, options);

        return res.status(200).cookie("jwt",token, { httpOnly: true, secure: process.env.NODE_ENV === "production", sameSite: "lax",maxAge:1000*60*60 }).json({ message: "Login successful", userId: user.id });

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
    const payload = { email: user.email, id: user.id };
    const token = jwt.sign(payload, process.env.JWT_SECRET!, { expiresIn: "7d" });

    // Set cookie and redirect back to your frontend
    return res
        .cookie("jwt", token, { 
            httpOnly: true, 
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
        }).json({ message: "Google login successful", userId: user.id });
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
        const decoded= jwt.verify(token, process.env.JWT_SECRET!) as { email: string, id: number };
        return res.status(200).json({ message: "Authenticated", userId: decoded.id, isAuthenticated: true });
    }
    catch(error){
        console.error("Error verifying token:", error);
        return res.status(401).json({ message: "Unauthorized" , isAuthenticated: false});
    }
}