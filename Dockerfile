FROM node:8.9.4-alpine

WORKDIR /app

COPY package.json .
COPY yarn.lock .

RUN yarn install --production --pure-lockfile

COPY src ./src
COPY .env .

EXPOSE 80

CMD ["npm", "run", "dev"]