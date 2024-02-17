# Use a imagem oficial do Node.js baseada em Alpine Linux, recomendada por ser uma 
# distribuição Linux leve, pequena e eficiente. 
FROM node:alpine

# Crie um diretório de trabalho para a aplicação
WORKDIR /usr/src/app

# Copie os arquivos package.json e package-lock.json para o diretório de trabalho
COPY package*.json ./

# Instale as dependências da aplicação
RUN npm install

# Copie os arquivos da aplicação para o diretório de trabalho
COPY . .

# Exponha a porta 3000 para que a aplicação possa ser acessada externamente
EXPOSE 3000

# Defina o comando para iniciar a aplicação
CMD ["npm", "start"]