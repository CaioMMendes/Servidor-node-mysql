"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.googleLogin = exports.uploadAvatarImg = exports.userInfo = exports.register = exports.login = void 0;
const login_1 = require("../models/login");
const promises_1 = require("fs/promises");
const driveUpload_1 = require("../controllers/driveUpload");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const login = async function (req, res) {
    const email = req.body.email;
    const password = req.body.password;
    const isChecked = req.body.isChecked;
    const validate = await login_1.loginUser.findOne({
        where: {
            email,
        },
    });
    if (validate) {
        if (await bcrypt.compare(password, validate.password)) {
            const accessToken = jwt.sign({ id: validate.id }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "15m" });
            const refreshToken = jwt.sign({ id: validate.id }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: "30d" });
            await login_1.loginUser.update({ token: refreshToken }, { where: { email } });
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
        }
        else {
            res.status(418).json(false);
        }
    }
    else
        res.status(418).json(false);
};
exports.login = login;
const register = async function (req, res) {
    //  let results:any=await   sequelizeInstance.query(`delete from produtos where nome='cadeira'`)
    const email = req.body.email;
    const password = await bcrypt.hash(req.body.password, 10);
    const name = req.body.name;
    const googleId = req.body.googleId;
    const picture = req.body.picture;
    console.log("googleId", googleId);
    const validate = await login_1.loginUser.findOne({
        where: {
            email,
        },
    });
    if (validate) {
        res.status(418).json({ email: validate.email });
        return;
    }
    const results = await login_1.loginUser.create({
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
exports.register = register;
const userInfo = async (req, res) => {
    console.log("userinfo", req.body);
    let user = await login_1.loginUser.findOne({
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
exports.userInfo = userInfo;
const uploadAvatarImg = async (req, res) => {
    console.log("entrou avatar img");
    if (req.file) {
        console.log(req.file);
        const userId = req.body.userId;
        let imageId = "";
        await (0, driveUpload_1.createFile)(req.file).then((data) => {
            console.log(data);
            imageId = data.id;
        });
        // await deleteFile("18_ZuYgt3Z5MKaGAUAlBJjm809BgLvcW2");
        // await updateFile("1a-g9YCzQC1-TBznCFhVcNBfgxjVyFt5b", req.file.path);
        const updateImageDb = await login_1.loginUser.update({
            avatarId: imageId,
        }, 
        // { where: { id: 122 } }
        { where: { id: userId } });
        //Para deletar o arquivo usa o unlink
        await (0, promises_1.unlink)(req.file.path);
        res.json({});
    }
    else {
        res.status(400);
        res.json({ error: "Arquivo inválido" });
    }
};
exports.uploadAvatarImg = uploadAvatarImg;
const googleLogin = async function (req, res) {
    const email = req.body.email;
    const googleId = req.body.googleId;
    const isChecked = req.body.isChecked;
    console.log(req.body);
    const validate = await login_1.loginUser.findOne({
        where: {
            email,
        },
    });
    if (validate) {
        if (validate.googleId === googleId) {
            console.log("entrou googleid");
            const accessToken = jwt.sign({ id: validate.id }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "15m" });
            const refreshToken = jwt.sign({ id: validate.id }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: "30d" });
            await login_1.loginUser.update({ token: refreshToken }, { where: { email } });
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
        }
        else {
            res.status(418).json(false);
        }
    }
    else
        res.json({ redirect: true });
};
exports.googleLogin = googleLogin;
//# sourceMappingURL=apiLogginController.js.map