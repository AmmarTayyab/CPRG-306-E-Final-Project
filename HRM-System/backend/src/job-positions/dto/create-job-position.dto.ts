import { IsInt, IsNotEmpty, IsString } from 'class-validator';

export class CreateJobPositionDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsInt()
  @IsNotEmpty()
  departmentId: number;
}
