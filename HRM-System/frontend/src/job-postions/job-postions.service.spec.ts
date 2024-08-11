import { Test, TestingModule } from '@nestjs/testing';
import { JobPostionsService } from './job-postions.service';

describe('JobPostionsService', () => {
  let service: JobPostionsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [JobPostionsService],
    }).compile();

    service = module.get<JobPostionsService>(JobPostionsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
