// Importa o módulo express para criar o servidor web
const express = require("express");

// Cria um novo objeto de roteador Express.
const router = express.Router();

// Importa o módulo mysql para se conectar ao banco de dados MySQL
const mysql = require("mysql");

// Cria uma conexão com o banco de dados MySQL
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "email_collection",
});

// Estabelece a conexão com o banco de dados MySQL
db.connect((err) => {
  if (err) throw err;
  console.log("Conectado ao banco de dados MySQL");
});

// Define a rota /get-emails que recupera os e-mails do banco de dados
router.get("/get-emails", (req, res) => {
  const sql = `SELECT * FROM emails`;
  db.query(sql, (err, result) => {
    if (err) {
      res.status(500).send("Erro ao recuperar e-mails");
    } else {
      res.status(200).send(result);
    }
  });
});

// Define a rota /check-email que verifica se o e-mail já existe no banco de dados
router.get("/check-email", (req, res) => {
  const email = req.query.email;
  const checkEmailSql = "SELECT * FROM emails WHERE email = ?";

  // Verifica se o e-mail já existe no banco de dados
  db.query(checkEmailSql, [email], (err, result) => {
    if (err) {
      res.status(500).send("Erro ao verificar e-mail");
    } else if (result.length > 0) {
      res.status(200).json({ exists: true });
    } else {
      res.status(200).json({ exists: false });
    }
  });
});

// Define a rota /send-email que insere um novo e-mail no banco de dados
router.post("/send-email", (req, res) => {
  const email = req.body.email;
  const sql = "INSERT INTO emails (email) VALUES (?)";
  db.query(sql, [email], (err, result) => {
    if (err) {
      res.status(500).send("Erro ao enviar email");
    } else {
      res.status(200).send("Email enviado com sucesso");
    }
  });
});

module.exports = router;