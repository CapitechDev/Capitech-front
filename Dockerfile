# Usar uma imagem base do Node.js
FROM node:14

# Definir o diretório de trabalho
WORKDIR /app

# Copiar o package.json e o package-lock.json
COPY package*.json ./

# Instalar as dependências
RUN npm install

# Copiar o restante do código da aplicação
COPY . .

# Instalar dependências de construção
RUN npm install --only=dev

# Construir a aplicação
RUN npm run build || { cat /root/.npm/_logs/*-debug.log; echo 'Build falhou'; exit 1; }

# Expor a porta que a aplicação irá rodar
EXPOSE 3000

# Comando para rodar a aplicação
CMD ["npm", "start"]