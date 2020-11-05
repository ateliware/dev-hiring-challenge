import express, { Application } from 'express'
import cors from 'cors'
import http from 'http'
import authRoute from '@src/routes/auth.route'
import repoRoute from '@src/routes/repo.route'
import logger from './logger'
import pino from 'express-pino-logger'
import config, { IConfig } from 'config'
import { Connection } from 'typeorm'
import { databaseConnect } from './database'
import { notFound } from './middlewares/404.middleware'

export class SetupServer {
  private server?: http.Server
  private database?: Connection

  constructor(
    private port: IConfig = config.get('App.port'),
    private app: Application = express()
  ) {}

  public get App(): Application {
    return this.app
  }

  public async init(): Promise<void> {
    this.middlewares()
    this.controllers()
    await this.initDatabase()
  }

  private middlewares(): void {
    this.app.use(express.json())
    this.app.use(cors({ origin: '*', exposedHeaders: 'auth-token' }))
    this.app.use(pino({ logger: logger }))
  }
  
  private controllers(): void {
    this.app.use('/auth/', authRoute)
    this.app.use('/api/', repoRoute)
    this.app.get('*', notFound);
  }

  public closeServer(): void {
    if (this.server) {
      this.server.close()
    }
  }

  public start(): void {
    if (this.database?.isConnected) {
      this.server = this.app.listen(this.port)
      logger.info(`Server listen on port ${this.port.toString()}`)
    }
  }

  private async initDatabase(): Promise<void> {
    this.database = await databaseConnect()
  }

  public async closeDatabase(): Promise<void> {
    await this.database?.close()
  }
}
