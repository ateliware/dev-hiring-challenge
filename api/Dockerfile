FROM node:lts as Production

ENV node_env=production

WORKDIR /usr/src/api

COPY package.json .
COPY package-lock.json .

RUN npm install

COPY . .

RUN cp .env.example .env

RUN npx prisma migrate dev

RUN npm run build

CMD ["sh","-c","npm run start:production"]