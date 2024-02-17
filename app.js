// Importa o módulo path para trabalhar com caminhos de arquivos e diretórios
const path = require("path");

// Importa o módulo express para criar o servidor web
const express = require("express");

// Importa o módulo body-parser para analisar o corpo das solicitações HTTP
const bodyParser = require("body-parser");

// Importa o emailController.js como middleware para as rotas relacionadas a e-mails
const emailController = require("./controllers/emailController");

// Cria uma instância do servidor express
const app = express();

// Define a porta em que o servidor irá ouvir
const port = 3000;

// Adiciona o middleware body-parser para analisar o corpo das solicitações HTTP
app.use(bodyParser.json());

// Define o diretório público para servir arquivos estáticos
app.use(express.static(path.join(__dirname, 'public')));

// Define o controlador de rota emailController na raiz do aplicativo
app.use("/", emailController);

// Define a rota raiz que envia o arquivo index.html
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public/html", "index.html"));
});

// Define a rota /emails.html que envia o arquivo emails.html
app.get("/emails.html", (req, res) => {
  res.sendFile(path.join(__dirname, "public/html", "emails.html"));
});

// Inicia o servidor express na porta especificada
app.listen(port, () => {
  console.log(`App ouvindo em http://localhost:${port}`);
});