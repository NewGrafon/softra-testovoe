ARG NODE_VERSION=22.3.0

FROM node:${NODE_VERSION}-alpine as base


RUN mkdir -p /home/node/app && chown -R node:node /home/node/app
WORKDIR /home/node/app


COPY package.json package-lock.json ./



RUN npm ci
COPY . .
RUN npm run build

EXPOSE ${PORT}

# Ожидание пока инициализируется база данных в другом сервисе, после миграция, после запуск бэка
CMD sleep 10 && npm run migrations:run && npm run start:prod