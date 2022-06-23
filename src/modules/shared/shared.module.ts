import { Module } from '@nestjs/common'
import { SharedService } from './shared.service'
import { SharedResolver } from './shared.resolver'

@Module({
  providers: [SharedResolver, SharedService]
})
export class SharedModule {}
