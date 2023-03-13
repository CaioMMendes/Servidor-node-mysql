import { verifyJWT } from './../middleware/verifyJWT';
import { Router } from "express";   
import * as apiController from '../controllers/apiLogginController'
import { refreshTokenController } from "../controllers/refreshTokenController";
import { logoutController } from "../controllers/logoutController";

const router=Router()

router.post('/login',apiController.login)
router.post('/register',apiController.register)
router.get("/refresh", refreshTokenController);
router.post("/logout", logoutController);
router.post('/userinfo',verifyJWT,apiController.userInfo)
export default router


