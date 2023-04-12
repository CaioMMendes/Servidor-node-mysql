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
      // text: `click here to verificate ${url}`,
      html: `<!DOCTYPE html>
        <html>
        <head>
            <title>Exemplo de email estilizado</title>
            <style>
                h1 {
                    color: blue;
                    font-size: 24px;
                }
            </style>
        </head>
        <body>
            <h1>Olá, Fulano!</h1>
            <p>Este é um exemplo de email estilizado.</p>
            <a href=${url} target="_blank"><button>Clique aqui</button></a>
        </body>
        </html>`,
    });
    console.log("Email sent successfully");
  } catch (error) {
    console.log("Email not send");

    console.log(error);
  }
};
