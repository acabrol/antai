FROM node:22-alpine

WORKDIR /app

COPY package.json package-lock.json README.md ./
COPY src ./src
COPY public ./public
COPY data ./data

ENV HOST=0.0.0.0
ENV PORT=3100

EXPOSE 3100

CMD ["node", "src/server.js"]
