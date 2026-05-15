import express from "express";
import cors from "cors";
import prisma from "./src/database/prisma.js";
import { userRoutes, quizRoutes } from "./src/routes/index.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/usuarios", userRoutes);
app.use("/quizzes", quizRoutes);

async function conectarBanco() {
  try {
    await prisma.$connect();

    console.log("✅ Banco de dados conectado com sucesso");
  } catch (error) {
    console.log("❌ Erro ao conectar no banco");

    console.log(error);
  }
}

conectarBanco();

app.listen(3000, () => {
  console.log("🚀 Servidor rodando na porta 3000");
});
