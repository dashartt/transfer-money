FROM node:16-alpine

WORKDIR /frontend

COPY package.json ./

COPY ./ ./

RUN npm install --loglevel verbose

CMD [ "npm", "run", "dev"]