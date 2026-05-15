import express from "express";

import {
  criarQuiz,
  buscarQuizzesPorTema,
  buscarQuizCompleto,
  buscarQuizzesPorUsuario,
  deletarQuiz,
} from "../controllers/quizController.js";

import { autenticar } from "../middlewares/authMiddleware.js";

const router = express.Router();

// precisa estar logado
router.post("/", autenticar, criarQuiz);

router.get("/:id", buscarQuizCompleto);
router.get("/tema/:temaId", buscarQuizzesPorTema);
router.get("/usuario/:id", buscarQuizzesPorUsuario);

router.delete("/:id", deletarQuiz);

export default router;
