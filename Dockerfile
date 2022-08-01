FROM node:17-alpine

WORKDIR /app

COPY package.json .

RUN npm i
RUN npm i -D

COPY . .

EXPOSE 3000

CMD [ "npm","start" ]