import { Module } from '@nestjs/common'
import { SharedModule } from './modules/shared/shared.module'

@Module({
  imports: [SharedModule]
})
export class AppModule {}
