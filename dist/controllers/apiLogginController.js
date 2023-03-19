"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadAvatarImg = exports.userInfo = exports.register = exports.login = void 0;
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
            console.log("login");
            if (isChecked) {
                res.cookie("jwt", refreshToken, {
                    httpOnly: true,
                    // sameSite: "none",
                    // secure: false, //true para requisições de sites https
                    maxAge: 30 * 24 * 60 * 60 * 1000,
                });
            }
            console.log(refreshToken);
            res.json({
                name: validate.name,
                email: validate.email,
                token: accessToken,
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
    res.json(results);
};
exports.register = register;
const userInfo = async (req, res) => {
    let user = await login_1.loginUser.findOne({
        where: {
            //esse id sai da criptografia que eu coloquei no jwt ai quando ta certo o token retorna o id
            id: req.id,
        },
    });
    console.log("entrou no user info");
    res.json(user);
};
exports.userInfo = userInfo;
const uploadAvatarImg = async (req, res) => {
    if (req.file) {
        console.log(req.file);
        await (0, driveUpload_1.uploadFile)(req.file).then((data) => {
            console.log(data);
        });
        //Para deletar o arquivo usa o unlink
        await (0, promises_1.unlink)(req.file.path);
        res.json({});
    }
    else {
        res.sendStatus(400);
        res.json({ error: "Arquivo inválido" });
    }
};
exports.uploadAvatarImg = uploadAvatarImg;
//# sourceMappingURL=apiLogginController.js.map