import express from "express";

import {
  criarPergunta,
  atualizarPergunta,
  deletarPergunta,
  alterarCorreta,
} from "../controllers/perguntaController.js";

const router = express.Router();

router.post("/", criarPergunta);
router.put("/:id", atualizarPergunta);
router.delete("/:id", deletarPergunta);
router.patch("/:perguntaId/correta/:alternativaId", alterarCorreta);

export default router;
