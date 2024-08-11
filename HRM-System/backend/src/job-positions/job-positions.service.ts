import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateJobPositionDto } from './dto/create-job-position.dto';
import { UpdateJobPositionDto } from './dto/update-job-position.dto';
import { PrismaService } from 'nestjs-prisma';

@Injectable()
export class JobPositionsService {
  constructor(private prisma: PrismaService) {}

  async create(createJobPositionDto: CreateJobPositionDto) {
    return this.prisma.jobPosition.create({
      data: {
        name: createJobPositionDto.name,
        departments: {
          connect: { id: createJobPositionDto.departmentId },
        },
      },
    });
  }

  async findAll() {
    return this.prisma.jobPosition.findMany();
  }

  async findOne(id: number) {
    const jobPosition = await this.prisma.jobPosition.findUnique({
      where: { id },
    });

    if (!jobPosition) {
      throw new NotFoundException(`JobPosition with ID ${id} not found`);
    }

    return jobPosition;
  }

  async update(id: number, updateJobPositionDto: UpdateJobPositionDto) {
    const jobPosition = await this.prisma.jobPosition.findUnique({
      where: { id },
    });

    if (!jobPosition) {
      throw new NotFoundException(`JobPosition with ID ${id} not found`);
    }

    return this.prisma.jobPosition.update({
      where: { id },
      data: {
        name: updateJobPositionDto.name,
        departments: {
          connect: { id: updateJobPositionDto.departmentId },
        },
      },
    });
  }

  async remove(id: number) {
    const jobPosition = await this.prisma.jobPosition.findUnique({
      where: { id },
    });

    if (!jobPosition) {
      throw new NotFoundException(`JobPosition with ID ${id} not found`);
    }

    return this.prisma.jobPosition.delete({
      where: { id },
    });
  }
}
