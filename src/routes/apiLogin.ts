import { verifyEmailToken } from "./../middleware/verifyEmailToken";
import { verifyJWT } from "./../middleware/verifyJWT";
import { Router } from "express";
import * as apiController from "../controllers/apiLoginController";
import { refreshTokenController } from "../controllers/refreshTokenController";
import { logoutController } from "../controllers/logoutController";
import multer from "multer";
const crypto = require("crypto");
import { Hash } from "crypto";
const router = Router();
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./temp");
  },
  filename: (req: any, file: any, cb) => {
    crypto.randomBytes(16, (err: any, hash: any) => {
      // if (err) cb(err); Tá dando erro de expected 2 arguments but got 1
      // const filename = `${hash.toString("hex")}-${req.name}`;
      // const filename = `${hash.toString("hex")}-${file.name}`;
      const filename = `${hash.toString("hex")}-${file.originalname}`;
      cb(null, filename);
    });
  },
});
const upload = multer({
  storage: storage,
  fileFilter: (req: any, file: any, cb) => {
    const allowed: string = "image/";
    // cb(null, file.type.includes(allowed));
    cb(null, file.mimetype.includes(allowed));
    // cb(null, req.type.includes(allowed));
  },
  limits: { fieldSize: 10485760, fileSize: 10485760 },
});
router.post("/login", apiController.login);
router.post("/recover-password", apiController.recoverPassword);
router.post("/googleLogin", apiController.googleLogin);
router.post("/register", apiController.register);
router.get("/refresh", refreshTokenController);
router.post("/logout", logoutController);
router.post("/userinfo", verifyJWT, apiController.userInfo);
router.post("/upload", upload.single("file"), apiController.uploadAvatarImg);
router.post("/update-user-info", verifyJWT, apiController.updateUserInfo);
router.get(
  "/:randomBites/verify/:emailToken",
  verifyEmailToken,
  apiController.verificatedEmail
);

export default router;
