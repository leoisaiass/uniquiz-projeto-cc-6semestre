import prisma from "../database/prisma.js";

export const criarQuiz = async (req, res) => {
  try {
    const { titulo, descricao, dificuldade, tema_id } = req.body;

    const quiz = await prisma.quizzes.create({
      data: {
        titulo,
        descricao,
        dificuldade,
        tema_id: Number(tema_id),

        // vem do token JWT (usuário logado)
        usuario_id: req.usuario.id,
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

export const buscarQuizCompleto = async (req, res) => {
  try {
    const { id } = req.params;

    const quiz = await prisma.quizzes.findUnique({
      where: {
        id: Number(id),
      },
      include: {
        perguntas: {
          include: {
            alternativas: true,
          },
        },
        temas: true,
        usuarios: {
          select: {
            id: true,
            username: true,
            nome_completo: true,
            email: true,
          },
        },
      },
    });

    if (!quiz) {
      return res.status(404).json({ erro: "Quiz não encontrado" });
    }

    return res.json(quiz);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ erro: "Erro ao buscar quiz completo" });
  }
};

export const buscarQuizzesPorUsuario = async (req, res) => {
  const { id } = req.params;

  const quizzes = await prisma.quizzes.findMany({
    where: {
      usuario_id: Number(id),
    },
    include: {
      temas: true,
    },
  });

  return res.json(quizzes);
};

export const deletarQuiz = async (req, res) => {
  const { id } = req.params;

  await prisma.quizzes.delete({
    where: { id: Number(id) },
  });

  return res.json({ mensagem: "Quiz deletado" });
};
