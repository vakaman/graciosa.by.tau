FROM node:20

# Diretório de trabalho
WORKDIR /app

# Copia package.json e package-lock.json primeiro (para melhor cache de dependências)
COPY package*.json ./

# Instala dependências
RUN npm install

# Copia o restante do código
COPY . .

# Expõe a porta padrão do Nest
EXPOSE 3000

# Comando padrão (para produção)
CMD ["npm", "run", "start:dev"]
