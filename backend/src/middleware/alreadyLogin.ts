
import type { Request, Response, NextFunction } from "express";
function alreadyLogin(req: Request, res: Response, next: NextFunction) {
    if (req.isAuthenticated()) {
        return res.status(400).json({ message: "You are already logged in" });
    }
    next();
}

export default alreadyLogin;