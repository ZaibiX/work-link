import type { Request, Response, NextFunction } from "express";
import { UserRole } from "../../generated/prisma/enums.js";

export function mockAuth(req: Request, res: Response, next: NextFunction) {
  // 👇 Fake user
  (req as any).user = {
    id: "673b094d-a261-47dc-b066-20df99d14337",
    role: UserRole.WORKER,
    email: "john@email.com",
  };

  next();
}