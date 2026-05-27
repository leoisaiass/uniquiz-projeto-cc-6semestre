import {
  cadastrarUsuarioService,
  loginUsuarioService,
} from "../services/userService.js";

export const cadastrarUsuario = async (req, res) => {
  try {
    const { usuario, token } = await cadastrarUsuarioService(req.body);

    return res.status(201).json({
      mensagem: "Usuário criado com sucesso",

      token,

      usuario: {
        id: usuario.id,
        username: usuario.username,
        email: usuario.email,
      },
    });
  } catch (error) {
    if (error.message === "EMAIL_JA_EXISTE") {
      return res.status(400).json({ erro: "Email já cadastrado" });
    }

    if (error.message === "USUARIO_JA_EXISTE") {
      return res.status(400).json({ erro: "Usuário já cadastrado" });
    }

    return res.status(500).json({ erro: "Erro interno do servidor" });
  }
};

export const loginUsuario = async (req, res) => {
  const { email, senha } = req.body;

  if (!email || !senha) {
    return res.status(400).json({
      erro: "Preencha todos os campos",
    });
  }

  try {
    const { usuario, token } = await loginUsuarioService(email, senha);

    return res.status(200).json({
      mensagem: "Login realizado com sucesso",
      token,
      usuario: {
        id: usuario.id,
        username: usuario.username,
        email: usuario.email,
      },
    });
  } catch (error) {
    return res.status(401).json({
      erro: "Email ou senha inválidos!",
    });
  }
};
