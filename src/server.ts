import express, { Application } from 'express'
import cors from 'cors'
import http from 'http'
import authRoute from '@src/routes/auth.route'
import logger from './logger'
import pino from 'express-pino-logger'
import config, { IConfig } from 'config'

export class SetupServer {
  private server?: http.Server

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
  }

  private middlewares(): void {
    this.app.use(express.json())
    this.app.use(cors({ origin: '*' }))
    this.app.use(pino({ logger: logger }))
  }

  private controllers(): void {
    this.app.use('/auth/', authRoute)
  }

  public closeServer(): void {
    if (this.server) {
      this.server.close()
    }
  }

  public start(): void {
    this.server = this.app.listen(this.port)
    logger.info(`Server listen on port ${this.port.toString()}`)
  }
}
