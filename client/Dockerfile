FROM node:lts as Production

ENV node_env=production

WORKDIR /usr/src/api

COPY package.json .
COPY package-lock.json .

RUN npm install

COPY . .

CMD ["sh","-c","npm run start:production"]