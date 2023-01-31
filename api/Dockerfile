FROM node:19-alpine

WORKDIR /app

COPY . /app/

COPY package.json /app/

RUN npm install

EXPOSE 9000

CMD [ "npm", "start" ]
