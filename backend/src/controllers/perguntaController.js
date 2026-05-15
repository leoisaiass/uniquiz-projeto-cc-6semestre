import prisma from "../database/prisma.js";

export const criarPergunta = async (req, res) => {
  try {
    const { quiz_id, texto } = req.body;

    if (!quiz_id || !texto) {
      return res.status(400).json({ erro: "Dados inválidos" });
    }

    const pergunta = await prisma.perguntas.create({
      data: {
        texto,
        quiz_id: Number(quiz_id),
      },
    });

    return res.status(201).json(pergunta);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ erro: "Erro ao criar pergunta" });
  }
};
