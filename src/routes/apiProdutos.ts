
import { Router } from "express";
import * as produtosController from "../controllers/produtosController";
const cors = require("cors");


const router = Router();

router.get("/products2",cors(), produtosController.products2);
router.get("/products3",cors(), produtosController.products3);
router.get("/produtos",cors(), produtosController.produtosGet);
router.post("/produtos",cors(), produtosController.produtosPost);




export default router;
