FROM node:20-alpine AS builder

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

FROM node:20-alpine AS runner

WORKDIR /app

COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package.json ./

COPY ["./.env", "./.env"]
COPY ["./.env.local", "./.env.local"]

ENV NODE_ENV=production

EXPOSE 3000

CMD ["node", "dist/main"]
