FROM node:22-alpine

WORKDIR /app

COPY package.json package-lock.json README.md ./
COPY src ./src
COPY public ./public
COPY data ./data

ENV HOST=0.0.0.0
ENV PORT=3000

EXPOSE 3000

CMD ["node", "src/server.js"]
