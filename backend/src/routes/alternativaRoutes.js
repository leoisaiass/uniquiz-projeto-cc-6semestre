import express from "express";

import {
  atualizarAlternativa,
  deletarAlternativa,
} from "../controllers/alternativaController.js";

const router = express.Router();

router.put("/:id", atualizarAlternativa);
router.delete("/:id", deletarAlternativa);

export default router;
