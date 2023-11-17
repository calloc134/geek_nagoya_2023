FROM node:16-alpine

RUN apk add --no-cache curl && \
    curl -f https://get.pnpm.io/v6.16.js | node - add --global pnpm

COPY . /app
WORKDIR /app

RUN pnpm install

EXPOSE 5173 3000

CMD ["pnpm", "run", "start"]
