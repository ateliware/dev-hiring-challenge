import { HttpModule } from '@nestjs/axios';
import { Test, TestingModule } from '@nestjs/testing';
import { ExternalApiRequestService } from './external-api-request.service';

describe('ExternalApiRequestService', () => {
  let service: ExternalApiRequestService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [HttpModule],
      providers: [ExternalApiRequestService],
    }).compile();

    service = module.get<ExternalApiRequestService>(ExternalApiRequestService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
