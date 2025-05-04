import { type Request, type Response, NextFunction } from "express";
import jwt from "jsonwebtoken"

export default function AdminMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    let token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      res.status(401).json({
        msg: "No token in headers",
      });
      return;
    }
    let jwtPass = process.env.JWT_SECRET || "defaultKey"
    let decoded = jwt.verify(token, jwtPass)
    
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({
        msg: error.message,
      });
    }
  }
}
