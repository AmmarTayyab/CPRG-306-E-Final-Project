import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { Response, UserInfo, UserProfile } from '../lib/types';
import { hashPassword } from '../lib/utils';
import { PrismaService } from 'nestjs-prisma';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PageOptionsDto } from '../pagination/page-options.dto';
import { PageDto } from '../pagination/page.dto';
import * as process from 'node:process';
import { PageMetaDto } from '../pagination/page-meta.dto';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async getUserById(id: string): Promise<UserProfile | null> {
    return this.prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        role: true,
        createdAt: true,
        status: true,
        employee: {
          select: {
            salary: true,
            department: {
              select: {
                name: true,
              },
            },
            contactDetail: {
              select: {
                phone: true,
                address: true,
              },
            },
          },
        },
      },
    });
  }

  async findAll(pageOptionsDto: PageOptionsDto): Promise<PageDto<UserInfo>> {
    const skip = pageOptionsDto.skip;
    const take = pageOptionsDto.take;

    // Fetch paginated items
    const entities = await this.prisma.user.findMany({
      skip,
      take,
      orderBy: {
        createdAt: 'desc', // Adjust as necessary
      },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        status: true,
      },
    });

    // Fetch total count of items
    const itemCount = await this.prisma.user.count();

    const pageRoute = `${process.env.MY_ROUTE}users/fetch-users?`;

    const pageMetaDto = new PageMetaDto({
      itemCount,
      pageRoute,
      pageOptionsDto,
    });

    return new PageDto(entities, pageMetaDto);
  }

  async createUser({
    firstName,
    lastName,
    salary,
    address,
    departmentId,
    password,
    phone,
    email,
    jobPositionId,
  }: CreateUserDto): Promise<Response> {
    const pass = await hashPassword(password);

    await this.prisma.user.create({
      data: {
        firstName,
        lastName,
        password: pass,
        email,
        employee: {
          create: {
            salary,
            department: {
              connect: {
                id: departmentId,
              },
            },
            jobPosition: {
              connect: {
                id: jobPositionId,
              },
            },
            contactDetail: {
              create: {
                phone,
                address,
              },
            },
          },
        },
      },
    });

    return {
      status: 'success',
      message: 'User Created Successfully',
    };
  }

  async update(
    id: string,
    updateUserDto: UpdateUserDto,
  ): Promise<{ status: string; message: string }> {
    const {
      firstName,
      lastName,
      salary,
      address,
      departmentId,
      password,
      phone,
      email,
    } = updateUserDto;
    const pass = await hashPassword(password);

    await this.prisma.user.update({
      where: { id },
      data: {
        firstName,
        lastName,
        email,
        password: pass,
        employee: {
          update: {
            salary: salary,
            department: departmentId
              ? {
                  connect: {
                    id: departmentId,
                  },
                }
              : undefined,
            contactDetail: {
              update: {
                phone: phone,
                address: address,
              },
            },
          },
        },
      },
    });

    return {
      status: 'success',
      message: 'User Updated Successfully',
    };
  }

  async deleteUser(id: string): Promise<User> {
    return this.prisma.user.delete({
      where: { id },
    });
  }

  findOne(email: string) {
    return this.prisma.user.findUnique({ where: { email } });
  }
}
