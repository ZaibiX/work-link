import type { Request, Response, NextFunction } from "express";
// import {prisma} from "../utils/prisma.js";
// import jwt from "jsonwebtoken";

// export default function protectRoute(allowedRoles: string[]) {
//     return async (req: Request, res: Response, next: NextFunction) => {
//         try {
//             const jwtToken = req.cookies.jwt;
//             if (!jwtToken) throw new Error("No token");

//             // If this fails, it jumps to the catch block instead of crashing the server
//             const decoded = jwt.verify(jwtToken, process.env.JWT_SECRET!) as { id: string };

//             const user = await prisma.user.findUnique({ where: { id: decoded.id } });
            
//             if (!user || (allowedRoles.length > 0 && !allowedRoles.includes(user.role))) {
//                 return res.status(403).json({ message: "Access Denied" });
//             }

//             // Attach user to req so your controller can use it later
//             (req as any).user = user; 
//             next();
//         } catch (error) {
//             return res.status(401).json({ message: "Invalid or expired token" });
//         }
//     }
// }


export default function protectRoute(allowedRoles: string[]=[]) {
    return (req: Request, res: Response, next: NextFunction) => {

        console.log("from protectRoute middleware, cookies:", req.cookies);
        console.log("from protectRoute middleware, user:", req.user);

        // Passport puts the user in req.user after authentication
        const user = req.user as any; 

        if (!user) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        if (allowedRoles.length > 0 && !allowedRoles.includes(user.role)) {
            return res.status(403).json({ message: "Forbidden" });
        }

        next();
    };
}