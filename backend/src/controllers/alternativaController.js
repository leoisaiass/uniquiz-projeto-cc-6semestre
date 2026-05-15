import prisma from "../database/prisma.js";

export const criarAlternativa = async (req, res) => {
  try {
    const { pergunta_id, texto, correta } = req.body;

    if (!pergunta_id || !texto) {
      return res.status(400).json({ erro: "Dados inválidos" });
    }

    const alternativa = await prisma.alternativas.create({
      data: {
        texto,
        correta: correta ?? false,
        pergunta_id: Number(pergunta_id),
      },
    });

    return res.status(201).json(alternativa);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ erro: "Erro ao criar alternativa" });
  }
};
