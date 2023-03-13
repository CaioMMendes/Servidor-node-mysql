import { allowedOrigins } from "../config/allowedOrigins";
import { Request, Response, NextFunction } from "express";
export const credentials = (req: Request, res: any, next: NextFunction) => {
  const origin: any = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
    res.header("Access-Control-Allow-Credentials", true);
  }
  next();
};
