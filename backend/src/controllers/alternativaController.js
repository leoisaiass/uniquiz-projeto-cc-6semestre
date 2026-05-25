import {
  atualizarAlternativa as atualizarAlternativaService,
  deletarAlternativa as deletarAlternativaService,
} from "../services/alternativaService.js";

export const atualizarAlternativa = async (req, res) => {
  try {
    const alternativa = await atualizarAlternativaService(
      req.params.id,
      req.body,
    );

    return res.json(alternativa);
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      erro: "Erro ao atualizar alternativa",
    });
  }
};

export const deletarAlternativa = async (req, res) => {
  try {
    await deletarAlternativaService(req.params.id);

    return res.json({
      mensagem: "Alternativa deletada",
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      erro: "Erro ao deletar alternativa",
    });
  }
};
