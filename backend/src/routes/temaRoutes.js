import express from "express";
import { listarTemas } from "../controllers/temaController.js";

const router = express.Router();

router.get("/", listarTemas);

export default router;
