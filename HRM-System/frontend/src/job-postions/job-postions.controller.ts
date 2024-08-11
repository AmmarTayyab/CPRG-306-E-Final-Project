import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { JobPostionsService } from './job-postions.service';
import { CreateJobPostionDto } from './dto/create-job-postion.dto';
import { UpdateJobPostionDto } from './dto/update-job-postion.dto';

@Controller('job-postions')
export class JobPostionsController {
  constructor(private readonly jobPostionsService: JobPostionsService) {}

  @Post()
  create(@Body() createJobPostionDto: CreateJobPostionDto) {
    return this.jobPostionsService.create(createJobPostionDto);
  }

  @Get()
  findAll() {
    return this.jobPostionsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.jobPostionsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateJobPostionDto: UpdateJobPostionDto) {
    return this.jobPostionsService.update(+id, updateJobPostionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.jobPostionsService.remove(+id);
  }
}
