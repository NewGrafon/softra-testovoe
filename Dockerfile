ARG NODE_VERSION=22.3.0

FROM node:${NODE_VERSION}-alpine as base


RUN mkdir -p /home/node/app && chown -R node:node /home/node/app
WORKDIR /home/node/app


COPY package.json package-lock.json ./



RUN npm ci
COPY . .
RUN npm run build

EXPOSE ${PORT}

# Ожидание пока инициализируется база данных в другом сервисе
CMD sleep 5

CMD npm run migrations:run && npm run start:prod