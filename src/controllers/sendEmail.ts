import nodemailer from "nodemailer";
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
import { Router } from "express";
import dotenv from "dotenv";
dotenv.config();
const router = Router();

export const sendEmail = async (id: number, email: any) => {
  const randomBytes = crypto.randomBytes(16).toString("hex");

  const emailToken = jwt.sign({ id: id }, process.env.EMAIL_TOKEN_SECRET, {
    expiresIn: "15m",
  });
  const url = `${process.env.BASE_URL}/${randomBytes}/verify/${emailToken}`;
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      service: process.env.EMAIL_SERVICE,
      port: Number(process.env.EMAIL_PORT),
      secure: Boolean(process.env.EMAIL_SECURE),
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
      from: process.env.EMAIL_USER,
    });
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Email Verification",
      text: `click here to verificate ${url}`,
      html: `<h1>click here to verificate ${url} </h1>`,
    });
    console.log("Email sent successfully");
  } catch (error) {
    console.log("Email not send");

    console.log(error);
  }
};
