# Usando a imagem oficial do Node.js
FROM node:22

# Definindo o diretório de trabalho
WORKDIR /app

# Copiando arquivos de dependências primeiro
COPY package*.json ./

# Instalando dependências
RUN yarn install

# Copiando os arquivos do projeto
COPY . .

# Build do projeto
RUN yarn build

# Expondo a porta do servidor
EXPOSE 3000

# Comando para rodar o servidor de produção
CMD ["yarn", "start"]