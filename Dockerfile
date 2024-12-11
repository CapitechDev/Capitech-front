# Usando a imagem oficial do Node.js
FROM node:18

# Definindo o diretório de trabalho
WORKDIR /app

# Copiando arquivos de dependências primeiro
COPY package*.json ./

# Instalando dependências
RUN npm install --legacy-peer-deps

# Copiando os arquivos do projeto
COPY . .

# Build do projeto
RUN npm run build

# Expondo a porta do servidor
EXPOSE 3000

# Comando para rodar o servidor de produção
CMD ["npm", "start"]