FROM node:16-alpine

WORKDIR /backend

COPY package.json ./

COPY ./ ./

RUN npm install --loglevel verbose

CMD [ "npm", "run", "dev"]