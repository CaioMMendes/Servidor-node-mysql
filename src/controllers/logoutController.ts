import { loginUser } from "../models/login";

import express, { Request, Response } from "express";
const cookieParser = require("cookie-parser");
const app = express();
app.use(cookieParser());
const jwt = require("jsonwebtoken");
require("dotenv").config();

export const logoutController = async (req: Request, res: Response) => {
  const cookies = req.cookies;

  console.log(cookies);
  if (!cookies?.jwt) return res.sendStatus(204);
  const refreshToken = cookies.jwt;
  console.log(refreshToken);
  const user: any = await loginUser.findOne({
    where: {
      token: refreshToken,
    },
  });
  console.log(user);

  if (!user) {
    res.clearCookie("jwt", {
      httpOnly: true,

      sameSite: "none",

      // secure: true,
    });

    return res.sendStatus(204);
  }

  //delete refreshToken db

  await loginUser.update({ token: null }, { where: { token: refreshToken } });
  res.clearCookie("jwt", {
    httpOnly: true,

    sameSite: "none",

    // secure: true - only serves on https - para aplicações reais usar isso
  });
  res.sendStatus(204);
};
