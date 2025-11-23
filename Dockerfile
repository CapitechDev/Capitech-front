FROM node:22-alpine

# Instalando dependências necessárias
RUN apk add --no-cache libc6-compat

# Definindo o diretório de trabalho
WORKDIR /app

# Copiando arquivos de dependências primeiro
COPY package.json yarn.lock* ./

# Instalando dependências
RUN yarn install --frozen-lockfile

# Copiando os arquivos do projeto
COPY . .

# Build do projeto
RUN yarn build

# Limpando cache
RUN yarn cache clean

# Expondo a porta do servidor
ARG PORT
ENV PORT=${PORT}
EXPOSE ${PORT}

# Comando para rodar o servidor de produção
CMD ["yarn", "start"]