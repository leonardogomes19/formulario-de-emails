
Formulário de Emails

Projeto criado com a intenção de coletar emails de usuários usando Javascript, Node.js, MySQL e Docker.

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

Importe o arquivo `database.sql` no diretório raiz do projeto dentro do MySQL para criar o banco de dados `email_collection` e a tabela `emails`

Execução -

Para construir a imagem do contêiner Docker usando o Dockerfile, você pode usar o seguinte comando dentro 
do diretório do projeto:
`docker build -t nome-da-imagem . `

Inicie os contêineres Docker:
`docker-compose up`

Acesse a aplicação em http://localhost:3000.

Para parar os contêineres Docker, pressione Ctrl + C no terminal onde você executou o comando docker-compose up.
