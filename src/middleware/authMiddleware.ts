import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";



// Extend Express Request to include userId
declare global {
  namespace Express {
    interface Request {
      userId?: string;
    }
  }
}

export const protect = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "No token, authorization denied" });
  }

  const token = authHeader.split(" ")[1];
  const secret = process.env.JWT_KEY;
  if (!secret) return res.status(500).json({ message: "JWT_KEY not defined" });

  try {
    const decoded = jwt.verify(token, secret) as { userId: string };
    req.userId = decoded.userId; // attach userId to request
    next();
  } catch (error) {
    return res.status(401).json({ message: "Token is not valid" });
  }
};
