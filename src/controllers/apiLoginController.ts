import { google } from "googleapis";

import { Request, Response } from "express";
import { loginUser } from "../models/login";
import { unlink } from "fs/promises";
import { createFile, updateFile, deleteFile } from "./driveUpload";
import { sendEmail } from "./sendEmail";
// import  {Jwt}  from "jsonwebtoken";

const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

export const login = async function (req: Request, res: any) {
  const email = req.body.email;
  const password = req.body.password;
  const isChecked = req.body.isChecked;
  const linkAccount = req.body.linkAccount;
  const googleId = req.body.googleId;
  const picture = req.body.picture;
  const validate = await loginUser.findOne({
    where: {
      email,
    },
  });
  if (validate?.expire) {
    console.log(validate.expire);
    const date = validate.expire;
    date.setMinutes(date.getMinutes() + 15);
    console.log(date);
    if (new Date() < date) {
      return res.json({ message: "Verifique o e-mail" });
    } else {
      await loginUser.destroy({
        where: { email },
      });
      return res.json({
        message:
          "O seu email de confirmação expirou, cadastre novamente para efetuar o login",
      });
    }
  }
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
      if (linkAccount === email) {
        await loginUser.update(
          { token: refreshToken, googleId: googleId, picture: picture },
          { where: { email } }
        );
      } else {
        await loginUser.update({ token: refreshToken }, { where: { email } });
      }

      if (isChecked) {
        res.cookie("jwt", refreshToken, {
          httpOnly: true,

          // sameSite: "none",

          // secure: false, //true para requisições de sites https
          maxAge: 30 * 24 * 60 * 60 * 1000,
        });
      }
      console.log("login", validate);
      return res.json({
        name: validate.name,
        email: validate.email,
        token: accessToken,
        googleId: validate.googleId,
        avatarId: validate.avatarId,
        picture: validate.picture,
      });
    } else {
      return res.json({ invalidUserPassword: true });
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
  let results;
  // const date = req.body.date;
  console.log("googleId", googleId);
  const validate = await loginUser.findOne({
    where: {
      email,
    },
  });
  if (
    email == "" ||
    email === null ||
    email == undefined ||
    name === undefined ||
    name == "" ||
    name === null
  ) {
    res.status(400);
    return;
  }
  if (validate) {
    res.status(418).json({ email: validate.email });
    return;
  }
  if (googleId) {
    results = await loginUser.create({
      email,
      password,
      name,
      googleId,
      picture,
      expire: null,
      // date,
    });
  } else {
    results = await loginUser.create({
      email,
      password,
      name,
      googleId,
      picture,
      // date,
    });
  }

  // const refreshToken = jwt.sign(
  //   { id: results.id },
  //   process.env.REFRESH_TOKEN_SECRET,
  //   { expiresIn: "30d" }
  // );
  // const insertTokenDb = await loginUser.update(
  //   { token: refreshToken },
  //   { where: { id: results.id } }
  // );
  console.log(googleId);
  if (googleId === null) {
    console.log("nullo");
    //todo substituir o caio03mendes@gmail.com por email, para enviar pro email da pessoa
    sendEmail(results.id, "caio03mendes@gmail.com");
  }
  console.log("id do usuario criado", results.id);

  return res.json(results.id);
};

export const userInfo = async (req: any, res: Response) => {
  console.log("userinfo", req.body);
  let user: any = await loginUser.findOne({
    where: {
      //esse id sai da criptografia que eu coloquei no jwt ai quando ta certo o token retorna o id
      id: req.id,
    },
  });
  if (user) {
    return res.json({
      name: user.name,
      email: user.email,
      token: user.token,
      googleId: user.googleId,
      avatarId: user.avatarId,
      picture: user.picture,
    });
  }
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
export const updateUserImg = async (req: any, res: Response) => {
  console.log("entrou no update user img");
  console.log(req.id);
  console.log(req.body);
  console.log(req.file);
  if (req.file) {
    console.log(req.file);
    const userId = req.id;
    console.log("id é:", req.id);
    let imageId = "";

    //todo create file
    // await createFile(req.file).then((data: any) => {
    //   console.log(data);

    //   imageId = data.id;
    // });
    //todo

    // await deleteFile("18_ZuYgt3Z5MKaGAUAlBJjm809BgLvcW2");
    // await updateFile("1a-g9YCzQC1-TBznCFhVcNBfgxjVyFt5b", req.file.path);

    //       async function loadData(){
    //       const [products,categories]=Promise.allSettled([loadProducts(),loadCategories()])
    //       return{products,categories}
    //     }
    // const [updateImageDb, findUserDb] = await Promise.allSettled([
    //   loginUser.update(
    //     {
    //       avatarId: imageId,
    //     },
    //     // { where: { id: 122 } }
    //     { where: { id: userId } }
    //   ),
    //   loginUser.findOne(
    //     // { where: { id: 122 } }
    //     { where: { id: userId } }
    //   ),
    // ]);

    //     //todo não vai dar certo porque teria que saber o avatarid antigo para excluir depois
    //  await createFile(req.file).then((data: any) => {
    //    imageId = data.id;
    //  });

    //    await loginUser.update(
    //      {
    //        avatarId: imageId,
    //      },
    //      // { where: { id: 122 } }
    //      { where: { id: userId } }
    //    );

    //     //todo
    const findUserDb: any = await loginUser.findOne({
      where: { id: userId },
    });
    console.log(imageId);
    //Para deletar o arquivo usa o unlink
    if (findUserDb && findUserDb.avatarId != null) {
      await updateFile(findUserDb.avatarId, req.file.path);
      imageId = findUserDb.avatarId;
    } else {
      await createFile(req.file).then((data: any) => {
        imageId = data.id;
      });

      await loginUser.update(
        {
          avatarId: imageId,
        },
        // { where: { id: 122 } }
        { where: { id: userId } }
      );
    }
    await unlink(req.file.path);
    console.log(imageId);
    return res.json({ avatarId: imageId });
  } else {
    res.status(400);

    return res.json({ error: "Arquivo inválido" });
  }
};

export const googleLogin = async function (req: Request, res: any) {
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
        picture: validate.picture,
      });

      return;
    } else {
      res.json({ email: validate.email, message: "Email já cadastrado" });
    }
  } else res.json({ redirect: true });
};
export const recoverPassword = async function (req: Request, res: Response) {
  const email = req.body.email;

  console.log(req.body);
  const validate = await loginUser.findOne({
    where: {
      email,
    },
  });

  if (validate) {
    //todo envia o email
    res.json({ message: email });
    return;
    // }
  } else res.json({ message: "E-mail not found" });
};

export const verificatedEmail = async function (req: any, res: any) {
  await loginUser.update({ expire: null }, { where: { id: req.id } });
  //pega o usuario que tem o email e coloca null na aba de expire
  res.redirect("http://localhost:5173/account/login");
};

export const updateUserInfo = async function (req: any, res: Response) {
  console.log("update user info");
  const name = req.body.name;
  const email = req.body.email;
  const password = req.body.password;
  const newPassword = req.body.newPassword;
  const newPasswordConfirm = req.body.newPasswordConfirm;
  if (newPassword !== newPasswordConfirm) {
    return res.sendStatus(403);
  }
  console.table({
    name,
    email,
    password,
    newPassword,
    newPasswordConfirm,
  });
  const user: any = await loginUser.findOne({
    where: {
      id: req.id,
    },
  });
  // console.log("user aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa", user);
  const updateUserInfo: any = await loginUser.update(
    {
      name,
      email,
    },
    // { where: { id: 122 } }
    { where: { id: req.id } }
  );
  //todo ta retornando o name e o email que chega porque eu precisei usar o findone antes
  //todo do update pra pegar a senha pra verificar se ta certa, e quando pega antes ele não
  //todo atualiza, ai estaria enviando o nome e e-mail anteriores
  return res.json({
    name: name,
    email: email,
  });
  // return res.json({
  //   name: user.name,
  //   email: user.email,
  // });
};

export const removeUserImg = async function (req: any, res: Response) {
  const user: any = await loginUser.findOne({
    where: {
      id: req.id,
    },
  });
  if (user.avatarId) {
    await deleteFile(user.avatarId);
    const updateUserInfo: any = await loginUser.update(
      {
        avatarId: null,
        picture: null,
      },
      // { where: { id: 122 } }
      { where: { id: req.id } }
    );
  }
  if (user.picture && user.avatarId === null) {
    const updateUserInfo: any = await loginUser.update(
      {
        picture: null,
      },
      // { where: { id: 122 } }
      { where: { id: req.id } }
    );
  }

  return res.sendStatus(200);
};

export const deleteUserAccount = async function (req: any, res: Response) {
  await loginUser.destroy(
    // { where: { id: 122 } }
    { where: { id: req.id } }
  );
  res.clearCookie("jwt", {
    httpOnly: true,

    // sameSite: "none",

    // secure: true,
  });

  return res.sendStatus(200);
};
