import express from "express";

import userRoutes from "./userRoutes.js";
import quizRoutes from "./quizRoutes.js";
import temaRoutes from "./temaRoutes.js";
import perguntaRoutes from "./perguntaRoutes.js";
import alternativaRoutes from "./alternativaRoutes.js";
import tentativaRoutes from "./tentativaRoutes.js";

const router = express.Router();

router.use("/usuarios", userRoutes);
router.use("/quizzes", quizRoutes);
router.use("/temas", temaRoutes);
router.use("/perguntas", perguntaRoutes);
router.use("/alternativas", alternativaRoutes);
router.use("/tentativas", tentativaRoutes);

export default router;
