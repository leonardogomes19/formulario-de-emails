const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const mysql = require("mysql");

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "email_collection",
});

db.connect((err) => {
  if (err) throw err;
  console.log("Conectado ao banco de dados MySQL");
});

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public/html", "index.html"));
});

app.get("/emails.html", (req, res) => {
  res.sendFile(path.join(__dirname, "public/html", "emails.html"));
});

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

app.listen(port, () => {
  console.log(`App ouvindo em http://localhost:${port}`);
});
