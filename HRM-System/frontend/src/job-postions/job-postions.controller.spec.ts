import { Test, TestingModule } from '@nestjs/testing';
import { JobPostionsController } from './job-postions.controller';
import { JobPostionsService } from './job-postions.service';

describe('JobPostionsController', () => {
  let controller: JobPostionsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [JobPostionsController],
      providers: [JobPostionsService],
    }).compile();

    controller = module.get<JobPostionsController>(JobPostionsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
