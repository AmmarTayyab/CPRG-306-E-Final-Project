import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { Response, UserInfo } from '../lib/types';
import { Public } from 'src/auth/constants';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiBearerAuth } from '@nestjs/swagger';
import { PageOptionsDto } from '../pagination/page-options.dto';
import { PageDto } from '../pagination/page.dto';

@Controller('api/v1/users')
@ApiBearerAuth('JWT')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Public()
  @Post('addUser')
  async signupUser(@Body() userData: CreateUserDto): Promise<Response> {
    return this.usersService.createUser(userData);
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.usersService.getUserById(id);
  // }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<{ status: string; message: string }> {
    return this.usersService.update(id, updateUserDto);
  }

  @Get('fetch')
  async getAllUsers(
    @Query() pageOptionsDto: PageOptionsDto,
  ): Promise<PageDto<UserInfo>> {
    return await this.usersService.findAll(pageOptionsDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.deleteUser(id);
  }
}
