import express from "express";
import { criarPergunta } from "../controllers/perguntaController.js";

const router = express.Router();

router.post("/", criarPergunta);

export default router;
