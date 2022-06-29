import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ExternalApiRequestService } from './external-api-request.service';

@Module({
  imports: [HttpModule.register({ timeout: 60000, maxRedirects: 5 })],
  providers: [ExternalApiRequestService],
  exports: [ExternalApiRequestService],
})
export class ExternalApiRequestModule {}
