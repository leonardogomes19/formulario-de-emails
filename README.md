
Formulário de Emails

Projeto criado com a intenção de coletar emails de usuários usando Javascript, Node.js e Docker.

Pré-requisitos -
Docker;
Docker Compose; 
Node.js; 
npm;
MySQL

Configuração -
Clone o repositório:
`git clone URL_DO_REPOSITORIO`

Acesse o diretório do projeto:
`cd NOME_DO_DIRETORIO_DO_PROJETO`

Instale as dependências do projeto:
`npm install`

Crie um arquivo .env no diretório raiz do seu projeto e defina as variáveis de ambiente necessárias para a sua aplicação. Por exemplo:
`MYSQL_ROOT_PASSWORD=sua-senha
MYSQL_PASSWORD=sua-senha
DB_PASSWORD=sua-senha`

Importe o arquivo `database.sql` no diretório raiz do projeto dentro do MySQL para criar o banco de dados `email_collection` e a tabela `emails`

Execução -
Inicie os contêineres Docker:
`docker-compose up`

Acesse a aplicação em http://localhost:3000.

Para parar os contêineres Docker, pressione Ctrl + C no terminal onde você executou o comando docker-compose up.
