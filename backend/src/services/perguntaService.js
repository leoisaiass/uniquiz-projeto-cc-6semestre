import prisma from "../database/prisma.js";

export async function criarPerguntaCompleta(data) {
  const { quiz_id, texto, alternativas } = data;

  if (!quiz_id || !texto || !alternativas) {
    throw new Error("Dados inválidos");
  }

  if (alternativas.length < 2) {
    throw new Error("Mínimo 2 alternativas");
  }

  if (alternativas.length > 4) {
    throw new Error("Máximo 4 alternativas");
  }

  const corretas = alternativas.filter((a) => a.correta);

  if (corretas.length !== 1) {
    throw new Error("Deve existir apenas 1 alternativa correta");
  }

  const pergunta = await prisma.perguntas.create({
    data: {
      texto,
      quiz_id: Number(quiz_id),

      alternativas: {
        create: alternativas.map((a) => ({
          texto: a.texto,
          correta: a.correta,
        })),
      },
    },

    include: {
      alternativas: true,
    },
  });

  return pergunta;
}

export async function atualizarPergunta(id, texto) {
  return prisma.perguntas.update({
    where: {
      id: Number(id),
    },

    data: {
      texto,
    },
  });
}

export const deletarPergunta = async (req, res) => {
  try {
    const { id } = req.params;

    await prisma.perguntas.delete({
      where: {
        id: Number(id),
      },
    });

    return res.json({
      mensagem: "Pergunta deletada",
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      erro: "Erro ao deletar pergunta",
    });
  }
};

export async function definirAlternativaCorreta(perguntaId, alternativaId) {
  const pergunta = await prisma.perguntas.findUnique({
    where: {
      id: Number(perguntaId),
    },

    include: {
      alternativas: true,
    },
  });

  for (const alt of pergunta.alternativas) {
    await prisma.alternativas.update({
      where: {
        id: alt.id,
      },

      data: {
        correta: alt.id === Number(alternativaId),
      },
    });
  }
}
