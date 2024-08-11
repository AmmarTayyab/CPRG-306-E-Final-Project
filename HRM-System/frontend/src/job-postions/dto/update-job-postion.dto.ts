import { PartialType } from '@nestjs/mapped-types';
import { CreateJobPostionDto } from './create-job-postion.dto';

export class UpdateJobPostionDto extends PartialType(CreateJobPostionDto) {}
