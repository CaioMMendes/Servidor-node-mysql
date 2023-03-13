import { Router } from "express";
import * as enderecoController from "../controllers/enderecoController";



const router = Router();

router.post("/cadastrar", enderecoController.cadastrar);

export default router;
