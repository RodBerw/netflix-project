# Etapa 1: Build da aplicação
FROM node:20-alpine AS builder

# Instalar build tools necessários para o sqlite3
RUN apk add --no-cache python3 make g++ pkgconfig

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build


# Etapa 2: Imagem final otimizada
FROM node:20-alpine

WORKDIR /app

# Instalamos dependências de produção apenas
COPY package*.json ./
RUN npm install --only=production

# Copiar o build
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/netflix_db.sqlite ./netflix_db.sqlite

# Se usar tsconfig paths ou outras configs, copie também
COPY --from=builder /app/tsconfig.json ./
COPY --from=builder /app/next.config.js ./

ENV NODE_ENV=production
EXPOSE 3000

CMD ["npm", "start"]
