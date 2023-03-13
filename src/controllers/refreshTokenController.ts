import { loginUser } from "../models/login";

import express, { Request, Response } from "express";
const cookieParser = require("cookie-parser");
const app = express();
app.use(cookieParser());
const jwt = require("jsonwebtoken");
require("dotenv").config();

export const refreshTokenController = async (req: any, res: any) => {
  const cookies = req.cookies;
  console.log(req.body);
  console.log(cookies);
  if (!cookies?.jwt) return res.sendStatus(401);
  const refreshToken = cookies.jwt;
  console.log(refreshToken);
  const user: any = await loginUser.findOne({
    where: {
      token: refreshToken,
    },
  });
  console.log(user);

  if (!user) return res.sendStatus(403); //forbiden

  jwt.verify(
    refreshToken,
    process.env.REFRESH_TOKEN_SECRET,
    (err: any, decoded: any) => {
      if (err || user.id !== decoded.id) return res.sendStatus(403);
      const accessToken = jwt.sign(
        { id: decoded.id },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: "30s" }
      );
      res.json({ accessToken });
    }
  );
};
