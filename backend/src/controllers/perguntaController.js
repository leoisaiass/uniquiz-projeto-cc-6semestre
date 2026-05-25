import {
  criarPerguntaCompleta,
  atualizarPergunta as atualizarPerguntaService,
  deletarPergunta as deletarPerguntaService,
  definirAlternativaCorreta,
} from "../services/perguntaService.js";

export const criarPergunta = async (req, res) => {
  try {
    const pergunta = await criarPerguntaCompleta(req.body);

    return res.status(201).json(pergunta);
  } catch (error) {
    console.log(error);

    return res.status(400).json({
      erro: error.message,
    });
  }
};

export const atualizarPergunta = async (req, res) => {
  try {
    const pergunta = await atualizarPerguntaService(
      req.params.id,
      req.body.texto,
    );

    return res.json(pergunta);
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      erro: "Erro ao atualizar pergunta",
    });
  }
};

export const deletarPergunta = async (req, res) => {
  try {
    await deletarPerguntaService(req.params.id);

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

export const alterarCorreta = async (req, res) => {
  try {
    await definirAlternativaCorreta(
      req.params.perguntaId,
      req.params.alternativaId,
    );

    return res.json({
      mensagem: "Alternativa correta atualizada",
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      erro: "Erro ao atualizar correta",
    });
  }
};
