FROM node:16-alpine

RUN npm config set cache /tmp --global
RUN chmod -R 777 /root/.npm/_logs

WORKDIR /backend

COPY package.json ./

COPY ./ ./

RUN npm install --loglevel verbose

CMD [ "npm", "run", "dev"]