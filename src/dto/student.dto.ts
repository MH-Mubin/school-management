import { IsString, IsNumber, IsOptional, Min, Max, MinLength } from 'class-validator';

export class CreateStudentDto {
  @IsString()
  @MinLength(2)
  name!: string;

  @IsNumber()
  @Min(5)
  @Max(25)
  age!: number;

  @IsOptional()
  @IsNumber()
  classId?: number;
}

export class UpdateStudentDto {
  @IsOptional()
  @IsString()
  @MinLength(2)
  name?: string;

  @IsOptional()
  @IsNumber()
  @Min(5)
  @Max(25)
  age?: number;

  @IsOptional()
  @IsNumber()
  classId?: number;
}

export class EnrollStudentDto {
  @IsNumber()
  studentId!: number;
}
