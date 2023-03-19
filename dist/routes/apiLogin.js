"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const verifyJWT_1 = require("./../middleware/verifyJWT");
const express_1 = require("express");
const apiController = __importStar(require("../controllers/apiLogginController"));
const refreshTokenController_1 = require("../controllers/refreshTokenController");
const logoutController_1 = require("../controllers/logoutController");
const multer_1 = __importDefault(require("multer"));
const crypto = require("crypto");
const router = (0, express_1.Router)();
const storage = multer_1.default.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./temp");
    },
    filename: (req, file, cb) => {
        crypto.randomBytes(16, (err, hash) => {
            // if (err) cb(err); Tá dando erro de expected 2 arguments but got 1
            const filename = `${hash.toString("hex")}-${file.originalname}`;
            cb(null, filename);
        });
    },
});
const upload = (0, multer_1.default)({
    storage: storage,
    fileFilter: (req, file, cb) => {
        const allowed = "image/";
        cb(null, file.mimetype.includes(allowed));
    },
    limits: { fieldSize: 10485760 },
});
router.post("/login", apiController.login);
router.post("/register", apiController.register);
router.get("/refresh", refreshTokenController_1.refreshTokenController);
router.post("/logout", logoutController_1.logoutController);
router.post("/userinfo", verifyJWT_1.verifyJWT, apiController.userInfo);
router.post("/upload", upload.single("avatar"), apiController.uploadAvatarImg);
exports.default = router;
//# sourceMappingURL=apiLogin.js.map