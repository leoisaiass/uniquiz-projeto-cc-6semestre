import prisma from "../database/prisma.js";

export const criarTentativa = async (req, res) => {
  try {
    const { quiz_id, pontuacao, total_questoes, tempo_segundos } = req.body;

    const tentativa = await prisma.tentativas.create({
      data: {
        quiz_id: Number(quiz_id),
        usuario_id: req.usuario.id,

        pontuacao,
        total_questoes,
        tempo_segundos,
      },
    });

    return res.status(201).json(tentativa);
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      erro: "Erro ao salvar tentativa",
    });
  }
};

export const buscarRankingQuiz = async (req, res) => {
  try {
    const { quizId } = req.params;

    const ranking = await prisma.tentativas.findMany({
      where: {
        quiz_id: Number(quizId),
      },

      include: {
        usuarios: {
          select: {
            id: true,
            username: true,
            nome_completo: true,
          },
        },
      },

      orderBy: [
        {
          pontuacao: "desc",
        },

        {
          tempo_segundos: "asc",
        },

        {
          created_at: "asc",
        },
      ],

      take: 10,
    });

    return res.json(ranking);
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      erro: "Erro ao buscar ranking",
    });
  }
};
