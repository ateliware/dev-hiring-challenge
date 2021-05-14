FROM node:alpine

WORKDIR /usr/app

COPY package*.json ./
COPY yarn.lock ./

RUN npm install

COPY . .

EXPOSE 3001

CMD ["npm", "run", "dev"]
