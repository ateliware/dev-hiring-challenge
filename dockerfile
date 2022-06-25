############### Development ###############

FROM node:16.15.1 AS development

ARG NODE_ENV=development
ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/app

COPY package.json ./

RUN yarn global add rimraf
RUN yarn install

COPY . .

CMD ["yarn", "start:dev"]

############### Production ###############

FROM node:16.15.1 AS production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/app

COPY package.json ./

RUN yarn global add rimraf
RUN yarn global add nest
RUN yarn install
RUN yarn build

COPY . .

CMD ["yarn", "start:prod"]
