import nodemailer from "nodemailer";
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
import { Router } from "express";
import dotenv from "dotenv";
dotenv.config();
const router = Router();

export const sendVerificationEmail = async (
  id: number,
  email: any,
  name: String
) => {
  const randomBytes = crypto.randomBytes(16).toString("hex");
  const nameCerto = name.charAt(0).toUpperCase() + name.slice(1);
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
            <title>Verificação de e-mail</title>
            <style>
                h1 {
                    color: #242424;
                    font-size: 24px;
                }
                .addButton {
  background-color: #7fff00;
  height: 30px;
  padding: 0 10px;
  border-radius: 5px;
  width: 9rem;
  font-size: var(--font-size);
  color: #333;
  font-weight: bold;
  cursor: pointer;
  border: 1px solid #444;
  transition: 0.5s;
  box-shadow: 1px 1px #888888;
}

.addButton:hover {
  box-shadow: 0 0.5em 0.5em -0.4em var(--hover);
  transform: translateY(-0.25em);
  background-color: #444;
  color: chartreuse;
  box-shadow: #444 2px 4px;
}
.texto{
  font-syze:12px;
}

            </style>
        </head>
        <body>
            <h1>Olá, ${nameCerto}!</h1>
            <p class="texto">Clique no botão para verificar sua conta.</p>
            <a href=${url} target="_blank"><button class="addButton">Verificar</button></a>
        </body>
        </html>`,
    });
    console.log("Email sent successfully");
  } catch (error) {
    console.log("Email not send");

    console.log(error);
  }
};

export const sendSucessfulVerificationEmail = async (
  id: number,
  email: any
) => {
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
      subject: "Sucessful verification",
      // text: `click here to verificate ${url}`,
      html: `<!DOCTYPE html>
        <html>
        <head>
            <title>Verificado com sucesso!</title>
            <style>
                h1 {
                    color: #242424;
                    font-size: 24px;
                }
                .addButton {
  background-color: #7fff00;
  height: 30px;
  padding: 0 10px;
  border-radius: 5px;
  width: 9rem;
  font-size: var(--font-size);
  color: #333;
  font-weight: bold;
  cursor: pointer;
  border: 1px solid #444;
  transition: 0.5s;
  box-shadow: 1px 1px #888888;
}

.addButton:hover {
  box-shadow: 0 0.5em 0.5em -0.4em var(--hover);
  transform: translateY(-0.25em);
  background-color: #444;
  color: chartreuse;
  box-shadow: #444 2px 4px;
}
.texto{
  font-syze:12px;
}

            </style>
        </head>
        <body>
            <h1>Obrigado por verificar o e-mail!</h1>
          
        </body>
        </html>`,
    });
    console.log("Email sent successfully");
  } catch (error) {
    console.log("Email not send");

    console.log(error);
  }
};
