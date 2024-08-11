import { Injectable } from '@nestjs/common';
import { CreateJobPostionDto } from './dto/create-job-postion.dto';
import { UpdateJobPostionDto } from './dto/update-job-postion.dto';

@Injectable()
export class JobPostionsService {
  create(createJobPostionDto: CreateJobPostionDto) {
    return 'This action adds a new jobPostion';
  }

  findAll() {
    return `This action returns all jobPostions`;
  }

  findOne(id: number) {
    return `This action returns a #${id} jobPostion`;
  }

  update(id: number, updateJobPostionDto: UpdateJobPostionDto) {
    return `This action updates a #${id} jobPostion`;
  }

  remove(id: number) {
    return `This action removes a #${id} jobPostion`;
  }
}
