# Stage 1
FROM node:10.16.3-alpine as node

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm i npm@latest -g

RUN npm install

COPY . .

RUN npm run build

# Stage 2
FROM nginx:1.13.12-alpine

COPY --from=node /usr/src/app/dist /usr/share/nginx/html

COPY ./nginx/nginx.conf /etc/nginx/nginx.conf
COPY ./nginx/nginx.vh.default.conf /etc/nginx/conf.d/default.conf
COPY ./nginx/404.html /etc/nginx/404.html
COPY ./nginx/404.html /usr/share/nginx/html
