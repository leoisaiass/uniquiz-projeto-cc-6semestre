import bcrypt from "bcrypt";
import prisma from "../database/prisma.js";

export const cadastrarUsuario = async (req, res) => {
  const { username, nomeCompleto, email, senha, confirmarSenha } = req.body;

  // validar campos
  if (!username || !nomeCompleto || !email || !senha || !confirmarSenha) {
    return res.status(400).json({
      erro: "Preencha todos os campos",
    });
  }

  // validar senha
  if (senha !== confirmarSenha) {
    return res.status(400).json({
      erro: "As senhas não coincidem",
    });
  }

  try {
    // verificar se email já existe
    const emailExistente = await prisma.usuarios.findUnique({
      where: {
        email,
      },
    });

    if (emailExistente) {
      return res.status(400).json({
        erro: "Email já cadastrado",
      });
    }

    // criptografar senha
    const senhaHash = await bcrypt.hash(senha, 10);

    // criar usuário
    await prisma.usuarios.create({
      data: {
        username,

        nome_completo: nomeCompleto,

        email,

        senha: senhaHash,
      },
    });

    return res.status(201).json({
      mensagem: "Usuário cadastrado com sucesso",
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      erro: "Erro interno do servidor",
    });
  }
};

export const loginUsuario = async (req, res) => {
  const { email, senha } = req.body;

  // validar campos
  if (!email || !senha) {
    return res.status(400).json({
      erro: "Preencha todos os campos",
    });
  }

  try {
    // buscar usuário
    const usuario = await prisma.usuarios.findUnique({
      where: {
        email,
      },
    });

    // usuário não encontrado
    if (!usuario) {
      return res.status(401).json({
        erro: "Email ou senha inválidos",
      });
    }

    // comparar senha
    const senhaCorreta = await bcrypt.compare(senha, usuario.senha);

    if (!senhaCorreta) {
      return res.status(401).json({
        erro: "Email ou senha inválidos",
      });
    }

    return res.status(200).json({
      mensagem: "Login realizado com sucesso",

      usuario: {
        id: usuario.id,

        username: usuario.username,

        email: usuario.email,
      },
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      erro: "Erro interno do servidor",
    });
  }
};
