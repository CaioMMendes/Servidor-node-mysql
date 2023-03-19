"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logoutController = void 0;
const login_1 = require("../models/login");
const express_1 = __importDefault(require("express"));
const cookieParser = require("cookie-parser");
const app = (0, express_1.default)();
app.use(cookieParser());
const jwt = require("jsonwebtoken");
require("dotenv").config();
const logoutController = async (req, res) => {
    const cookies = req.cookies;
    console.log(cookies?.jwt);
    if (!cookies?.jwt)
        return res.sendStatus(204);
    const refreshToken = cookies.jwt;
    const user = await login_1.loginUser.findOne({
        where: {
            token: refreshToken,
        },
    });
    console.log(user);
    if (!user) {
        res.clearCookie("jwt", {
            httpOnly: true,
            // sameSite: "none",
            // secure: true,
        });
        return res.sendStatus(204);
    }
    //delete refreshToken db
    await login_1.loginUser.update({ token: null }, { where: { token: refreshToken } });
    res.clearCookie("jwt", {
        httpOnly: true,
        // sameSite: "none",
        // secure: true - only serves on https - para aplicações reais usar isso
    });
    res.sendStatus(204);
};
exports.logoutController = logoutController;
//# sourceMappingURL=logoutController.js.map