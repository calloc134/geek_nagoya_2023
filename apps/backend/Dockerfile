FROM mcr.microsoft.com/devcontainers/typescript-node:1-20-bullseye

RUN curl -f https://get.pnpm.io/v6.16.js | node - add --global pnpm

COPY . /app
WORKDIR /app

RUN pnpm install

EXPOSE 5173 3000

CMD ["pnpm", "run", "start"]
