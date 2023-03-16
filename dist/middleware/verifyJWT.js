"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyJWT = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const jwt = require("jsonwebtoken");
dotenv_1.default.config();
const verifyJWT = (req, res, next) => {
    const authHeader = req.headers["authorization"];
    console.log(authHeader);
    if (!authHeader)
        return res.status(401);
    const token = authHeader.split(" ")[1];
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
        if (err)
            return res.sendStatus(403);
        req.id = decoded.id;
        next();
    });
};
exports.verifyJWT = verifyJWT;
//# sourceMappingURL=verifyJWT.js.map