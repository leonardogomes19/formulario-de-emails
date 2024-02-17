// Importa o módulo path para trabalhar com caminhos de arquivos e diretórios
const path = require("path");

// Importa o módulo express para criar o servidor web
const express = require("express");

// Importa o módulo body-parser para analisar o corpo das solicitações HTTP
const bodyParser = require("body-parser");

// Importa o módulo mysql para se conectar ao banco de dados MySQL
const mysql = require("mysql");

// Cria uma instância do servidor express
const app = express();

// Define a porta em que o servidor irá ouvir
const port = 3000;

// Adiciona o middleware body-parser para analisar o corpo das solicitações HTTP
app.use(bodyParser.json());

// Define o diretório público para servir arquivos estáticos
app.use(express.static(path.join(__dirname, 'public')));

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

// Define a rota raiz que envia o arquivo index.html
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public/html", "index.html"));
});

// Define a rota /emails.html que envia o arquivo emails.html
app.get("/emails.html", (req, res) => {
  res.sendFile(path.join(__dirname, "public/html", "emails.html"));
});

// Define a rota /get-emails que recupera os e-mails do banco de dados
app.get("/get-emails", (req, res) => {
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
app.get("/check-email", (req, res) => {
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
app.post("/send-email", (req, res) => {
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

// Inicia o servidor express na porta especificada
app.listen(port, () => {
  console.log(`App ouvindo em http://localhost:${port}`);
});