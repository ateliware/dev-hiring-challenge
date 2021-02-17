/* istanbul ignore file */
import { APIGatewayProxyHandler } from 'aws-lambda';
import { NestFactory } from '@nestjs/core';
import { Module, ValidationPipe } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ExpressAdapter } from '@nestjs/platform-express';
import awsServerlessExpress from 'aws-serverless-express';
import { Server } from 'http';
import express from 'express';

import { config } from 'dotenv';

import { TrioModule } from '.';

config();

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: String(process.env.DB_HOST),
      port: Number(process.env.DB_PORT),
      username: String(process.env.DB_USER),
      password: String(process.env.DB_PASS),
      database: String(process.env.DB_NAME),
      entities: [__dirname + '../../**/*.entity{.ts,.js}'],
      synchronize: false,
      logging: false,
      dropSchema: false,
    }),

    /* Modules */
    TrioModule,
  ],
})
class AppModule {}

let cachedServer: Server;

const bootstrapServer = async (): Promise<Server> => {
  const expressApp = express();
  const adapter = new ExpressAdapter(expressApp);
  const app = await NestFactory.create(AppModule, adapter);
  app.useGlobalPipes(new ValidationPipe());
  app.enableCors();

  await app.init();
  return awsServerlessExpress.createServer(expressApp);
};

export const handler: APIGatewayProxyHandler = async (event, context) => {
  if (!cachedServer) {
    const server = await bootstrapServer();
    cachedServer = server;
    return awsServerlessExpress.proxy(server, event, context, 'PROMISE')
      .promise;
  } else {
    return awsServerlessExpress.proxy(cachedServer, event, context, 'PROMISE')
      .promise;
  }
};
