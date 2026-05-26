import express from "express";

import { autenticar } from "../middlewares/authMiddleware.js";

import {
  criarTentativa,
  buscarRankingQuiz,
} from "../controllers/tentativaController.js";

const router = express.Router();

router.post("/", autenticar, criarTentativa);
router.get("/ranking/:quizId", buscarRankingQuiz);

export default router;
