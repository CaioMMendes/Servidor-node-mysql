import { verifyJWT } from "./../middleware/verifyJWT";
import { Router } from "express";
import * as apiController from "../controllers/apiLogginController";
import { refreshTokenController } from "../controllers/refreshTokenController";
import { logoutController } from "../controllers/logoutController";
import multer from "multer";
const router = Router();
const upload = multer({
  dest: "./temp",
  fileFilter: (req, file, cb) => {
    const allowed: string = "image/";
    console.log(file.mimetype);
    cb(null, file.mimetype.includes(allowed));
  },
});
router.post("/login", apiController.login);
router.post("/register", apiController.register);
router.get("/refresh", refreshTokenController);
router.post("/logout", logoutController);
router.post("/userinfo", verifyJWT, apiController.userInfo);
router.post("/upload", upload.single("avatar"), apiController.uploadAvatarImg);
export default router;
