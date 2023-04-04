import dotenv from "dotenv";
import { NextFunction, Request, Response } from "express";
const jwt = require("jsonwebtoken");
import path from "path";
dotenv.config();

//todo vai ter que pegar o token que veio da requisição e decodificar pra gerar o id decodificado

export const verifyEmailToken = (
  req: any,
  res: Response,
  next: NextFunction
) => {
  const urlString = req.protocol + "://" + req.get("host") + req.originalUrl;

  const urlPath = new URL(urlString).pathname;
  console.log(urlPath);
  // Obter os valores usando expressões regulares
  const matches: any = urlPath.match(/^\/([a-zA-Z\d]+)\/verify\/(.+)$/);

  // Extrair os valores correspondentes
  if (matches && matches.length >= 3) {
    const randomBytesUrl = matches[1];
    const tokenUrl = matches[2];
    console.log(randomBytesUrl);
    console.log(tokenUrl);

    jwt.verify(
      tokenUrl,
      process.env.EMAIL_TOKEN_SECRET,

      (err: Error, decoded: any) => {
        if (err) return res.sendStatus(403);
        req.id = decoded.id;
        next();
      }
    );
  } else {
    console.log("Não foi possível encontrar padrão correspondente na URL.");
  }
  //   const authHeader = req.headers["authorization"];
  //   console.log(authHeader);
  //   if (!authHeader) return res.status(401);
  //   if (!randomBytesUrl || !tokenUrl) return res.status(401);

  //   const token = tokenUrl.split(" ")[1];
};

//todo vai verificar o token do email e o token retornar o id do usuario, ai com esse id
//todo decodificado vai mandar pro vericatedemail pra colocar o email como verificado
