"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.refreshTokenController = void 0;
const login_1 = require("../models/login");
const express_1 = __importDefault(require("express"));
const cookieParser = require("cookie-parser");
const app = (0, express_1.default)();
app.use(cookieParser());
const jwt = require("jsonwebtoken");
require("dotenv").config();
const refreshTokenController = async (req, res) => {
    const cookies = req.cookies;
    console.log(cookies);
    if (!cookies?.jwt)
        return res.sendStatus(401);
    const refreshToken = cookies.jwt;
    console.log(refreshToken);
    const user = await login_1.loginUser.findOne({
        where: {
            token: refreshToken,
        },
    });
    console.log(user, "refresh Token");
    if (!user)
        return res.sendStatus(403); //forbiden
    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
        if (err || user.id !== decoded.id)
            return res.sendStatus(403);
        const accessToken = jwt.sign({ id: decoded.id }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "15m" });
        console.log("novo Token ", accessToken);
        res.json({ accessToken: accessToken });
    });
};
exports.refreshTokenController = refreshTokenController;
//# sourceMappingURL=refreshTokenController.js.map