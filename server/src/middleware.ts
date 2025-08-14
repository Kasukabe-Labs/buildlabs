import type { NextFunction, Request, Response } from "express";
import { getAuth } from "@clerk/express";

export interface AuthRequest extends Request {
  user: {
    id: string;
  };
}

function authMiddleware(req: Request, res: Response, next: NextFunction) {
  try {
    const auth = getAuth(req);
    if (!auth.userId) {
      return res.status(401).json({
        error: "Unauthorized",
        message: "Authentication required",
      });
    }

    (req as AuthRequest).user = {
      id: auth.userId,
    };

    next();
  } catch (error) {
    console.error("Auth middleware error:", error);
    return res.status(500).json({
      error: "Internal Server Error",
      message: "Authentication check failed",
    });
  }
}

export default authMiddleware;
