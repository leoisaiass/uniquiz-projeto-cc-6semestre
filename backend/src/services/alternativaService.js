import prisma from "../database/prisma.js";

export async function atualizarAlternativa(id, dados) {
  return prisma.alternativas.update({
    where: {
      id: Number(id),
    },

    data: dados,
  });
}

export async function deletarAlternativa(id) {
  return prisma.alternativas.delete({
    where: {
      id: Number(id),
    },
  });
}
