import { Module } from '@nestjs/common';
import { JobPostionsService } from './job-postions.service';
import { JobPostionsController } from './job-postions.controller';

@Module({
  controllers: [JobPostionsController],
  providers: [JobPostionsService],
})
export class JobPostionsModule {}
