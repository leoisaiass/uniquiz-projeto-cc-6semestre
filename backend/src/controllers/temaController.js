import prisma from "../database/prisma.js";

export const listarTemas = async (req, res) => {
  try {
    const temas = await prisma.temas.findMany();

    return res.status(200).json(temas);
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      erro: "Erro ao buscar temas",
    });
  }
};
