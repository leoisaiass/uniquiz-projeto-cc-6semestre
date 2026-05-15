import db from "../database/db.js";

export const criarQuizModel = (dados, callback) => {
  const sql = `
        INSERT INTO quizzes
        (
            titulo,
            descricao,
            dificuldade,
            tema_id,
            usuario_id
        )
        VALUES (?, ?, ?, ?, ?)
    `;

  db.query(
    sql,
    [
      dados.titulo,
      dados.descricao,
      dados.dificuldade,
      dados.tema_id,
      dados.usuario_id,
    ],
    callback,
  );
};
