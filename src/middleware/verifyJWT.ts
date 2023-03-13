import dotenv from "dotenv";
import { NextFunction, Request, Response } from "express";
const jwt = require("jsonwebtoken");

dotenv.config();

export const verifyJWT = (req: any, res: Response, next: NextFunction) => {
  const authHeader = req.headers["authorization"];
  console.log(authHeader);
  if (!authHeader) return res.status(401);

  const token = authHeader.split(" ")[1];
  jwt.verify(
    token,
    process.env.ACCESS_TOKEN_SECRET,

    (err: Error, decoded: any) => {
      if (err) return res.sendStatus(403);
      req.id = decoded.id;
      next();
    }
  );
};
