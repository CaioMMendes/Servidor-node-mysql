

import { Router } from "express";
import * as fornecedorController from "../controllers/fornecedorController";

const router = Router();

router.post("/fornecedor", fornecedorController.fornecedor);

export default router;







