import express from "express";

import {
  criarQuiz,
  buscarQuizzesPorTema,
} from "../controllers/quizController.js";

const router = express.Router();

router.post("/", criarQuiz);

router.get("/tema/:temaId", buscarQuizzesPorTema);

export default router;
