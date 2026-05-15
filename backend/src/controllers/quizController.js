import prisma from "../database/prisma.js";

export const criarQuiz = async (req, res) => {
  try {
    const { titulo, descricao, dificuldade, tema_id, usuario_id } = req.body;

    const quiz = await prisma.quizzes.create({
      data: {
        titulo,

        descricao,

        dificuldade,

        tema_id: Number(tema_id),

        usuario_id: Number(usuario_id),
      },
    });

    return res.status(201).json({
      mensagem: "Quiz criado com sucesso",

      quizId: quiz.id,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      erro: "Erro ao criar quiz",
    });
  }
};

export const buscarQuizzesPorTema = async (req, res) => {
  try {
    const { temaId } = req.params;

    const quizzes = await prisma.quizzes.findMany({
      where: {
        tema_id: Number(temaId),
      },
    });

    return res.status(200).json(quizzes);
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      erro: "Erro ao buscar quizzes",
    });
  }
};
