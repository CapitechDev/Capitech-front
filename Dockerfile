# Usando a imagem oficial do Node.js
FROM node:18

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

RUN yarn cache clean

# Expondo a porta do servidor
ARG PORT

ENV PORT=${PORT}

EXPOSE ${PORT}

# Comando para rodar o servidor de produção
CMD ["yarn", "start"]