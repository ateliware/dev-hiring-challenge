import 'dotenv/config'
import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'

async function bootstrap() {
  const PORT = process.env.PORT || process.env.APP_PORT || 3000

  const app = await NestFactory.create(AppModule)
  await app.listen(PORT)

  console.log(`\n 🎊  Server is up on port ${PORT} 🚀 \n`)
}

bootstrap()
