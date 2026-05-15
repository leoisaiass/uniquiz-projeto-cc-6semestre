import mysql from "mysql2";

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root123",
    database: "quizdb"
});

connection.connect((err) => {
    if (err) {
        console.log("Erro ao conectar:", err);
    } else {
        console.log("MySQL conectado");
    }
});

export default connection;