import bcrypt from "bcrypt";
import prisma from "../database/prisma.js";
import jwt from "jsonwebtoken";

export async function cadastrarUsuarioService(data) {
  const { username, nomeCompleto, email, senha } = data;

  const emailExistente = await prisma.usuarios.findUnique({
    where: { email },
  });

  if (emailExistente) {
    throw new Error("EMAIL_JA_EXISTE");
  }

  const senhaHash = await bcrypt.hash(senha, 10);

  const usuario = await prisma.usuarios.create({
    data: {
      username,
      nome_completo: nomeCompleto,
      email,
      senha: senhaHash,
    },
  });

  return usuario;
}

export async function loginUsuarioService(email, senha) {
  const usuario = await prisma.usuarios.findUnique({
    where: { email },
  });

  if (!usuario) {
    throw new Error("LOGIN_INVALIDO");
  }

  const senhaCorreta = await bcrypt.compare(senha, usuario.senha);

  if (!senhaCorreta) {
    throw new Error("LOGIN_INVALIDO");
  }

  const token = jwt.sign(
    {
      id: usuario.id,
      username: usuario.username,
      email: usuario.email,
    },
    "SEGREDO_SUPER_SECRETO",
    { expiresIn: "1d" },
  );

  return { usuario, token };
}
