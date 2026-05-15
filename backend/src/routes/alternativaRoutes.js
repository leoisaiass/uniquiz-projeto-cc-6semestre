import express from "express";
import { criarAlternativa } from "../controllers/alternativaController.js";

const router = express.Router();

router.post("/", criarAlternativa);

export default router;
