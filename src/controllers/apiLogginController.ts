import { google } from "googleapis";
import { Request, Response } from "express";
import { loginUser } from "../models/login";
import { unlink } from "fs/promises";
import { createFile, updateFile, deleteFile } from "../controllers/driveUpload";

const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

export const login = async function (req: Request, res: Response) {
  const email = req.body.email;
  const password = req.body.password;
  const isChecked = req.body.isChecked;
  const validate = await loginUser.findOne({
    where: {
      email,
    },
  });

  if (validate) {
    if (await bcrypt.compare(password, validate.password)) {
      const accessToken = jwt.sign(
        { id: validate.id },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: "15m" }
      );
      const refreshToken = jwt.sign(
        { id: validate.id },
        process.env.REFRESH_TOKEN_SECRET,
        { expiresIn: "30d" }
      );
      await loginUser.update({ token: refreshToken }, { where: { email } });

      if (isChecked) {
        res.cookie("jwt", refreshToken, {
          httpOnly: true,

          // sameSite: "none",

          // secure: false, //true para requisições de sites https
          maxAge: 30 * 24 * 60 * 60 * 1000,
        });
      }
      console.log("login", validate);
      res.json({
        name: validate.name,
        email: validate.email,
        token: accessToken,
        googleId: validate.googleId,
        avatarId: validate.avatarId,
        picture: validate.picture,
      });

      return;
    } else {
      res.status(418).json(false);
    }
  } else res.status(418).json(false);
};

export const register = async function (req: Request, res: Response) {
  //  let results:any=await   sequelizeInstance.query(`delete from produtos where nome='cadeira'`)

  const email = req.body.email;
  const password = await bcrypt.hash(req.body.password, 10);
  const name = req.body.name;
  const googleId = req.body.googleId;
  const picture = req.body.picture;
  console.log("googleId", googleId);
  const validate = await loginUser.findOne({
    where: {
      email,
    },
  });

  if (validate) {
    res.status(418).json({ email: validate.email });
    return;
  }

  const results = await loginUser.create({
    email,
    password,
    name,
    googleId,
    picture,
  });

  //todo- insere um refresh token no banco quando o usuario é cadastrado
  //todo- deixei comentando porque acho melhor só cadastrar esse token quando a pessoa logar a primeira vez
  // const refreshToken = jwt.sign(
  //   { id: results.id },
  //   process.env.REFRESH_TOKEN_SECRET,
  //   { expiresIn: "30d" }
  // );
  // const insertTokenDb = await loginUser.update(
  //   { token: refreshToken },
  //   { where: { id: results.id } }
  // );

  res.json(results.id);
};

export const userInfo = async (req: any, res: Response) => {
  console.log("userinfo", req.body);
  let user: any = await loginUser.findOne({
    where: {
      //esse id sai da criptografia que eu coloquei no jwt ai quando ta certo o token retorna o id
      id: req.id,
    },
  });

  res.json({
    name: user.name,
    email: user.email,
    token: user.token,
    googleId: user.googleId,
    avatarId: user.avatarId,
    picture: user.picture,
  });
};

export const uploadAvatarImg = async (req: any, res: Response) => {
  console.log("entrou avatar img");

  if (req.file) {
    console.log(req.file);
    const userId = req.body.userId;
    let imageId = "";

    await createFile(req.file).then((data: any) => {
      console.log(data);

      imageId = data.id;
    });

    // await deleteFile("18_ZuYgt3Z5MKaGAUAlBJjm809BgLvcW2");
    // await updateFile("1a-g9YCzQC1-TBznCFhVcNBfgxjVyFt5b", req.file.path);

    const updateImageDb = await loginUser.update(
      {
        avatarId: imageId,
      },
      // { where: { id: 122 } }
      { where: { id: userId } }
    );

    //Para deletar o arquivo usa o unlink
    await unlink(req.file.path);
    res.json({});
  } else {
    res.status(400);

    res.json({ error: "Arquivo inválido" });
  }
};

export const googleLogin = async function (req: Request, res: Response) {
  const email = req.body.email;
  const googleId = req.body.googleId;
  const isChecked = req.body.isChecked;
  console.log(req.body);
  const validate = await loginUser.findOne({
    where: {
      email,
    },
  });

  if (validate) {
    if (validate.googleId === googleId) {
      console.log("entrou googleid");
      const accessToken = jwt.sign(
        { id: validate.id },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: "15m" }
      );
      const refreshToken = jwt.sign(
        { id: validate.id },
        process.env.REFRESH_TOKEN_SECRET,
        { expiresIn: "30d" }
      );
      await loginUser.update({ token: refreshToken }, { where: { email } });

      if (isChecked) {
        res.cookie("jwt", refreshToken, {
          httpOnly: true,

          // sameSite: "none",

          // secure: false, //true para requisições de sites https
          maxAge: 30 * 24 * 60 * 60 * 1000,
        });
      }

      res.json({
        name: validate.name,
        email: validate.email,
        token: accessToken,
        googleId: validate.googleId,
        avatarId: validate.avatarId,
      });

      return;
    } else {
      res.status(418).json(false);
    }
  } else res.json({ redirect: true });
};
