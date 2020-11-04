import 'module-alias/register'
import { SetupServer } from '@src/server'

;(async (): Promise<void> => {
  const server = new SetupServer()
  await server.init()
  server.start()
})()
