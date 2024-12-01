import { ArrayNotEmpty, IsNotEmpty, IsString } from 'class-validator';
import { Students } from '../entity/students.entity';

export class SigninRequest {
  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @IsNotEmpty()
  @IsString()
  readonly nationality: string;

  @IsNotEmpty()
  @IsString()
  readonly email: string;

  @IsNotEmpty()
  @IsString()
  readonly password: string;

  @IsNotEmpty()
  @IsString()
  readonly education: string;

  @IsNotEmpty()
  @IsString()
  readonly major: string;

  @IsNotEmpty()
  @IsString()
  readonly visa: string;

  @IsNotEmpty()
  @IsString()
  readonly topikLevel: string;

  @IsNotEmpty()
  @ArrayNotEmpty()
  @IsString({ each: true })
  readonly tags: string[];
}

export class SigninResponse {
  readonly name: string;
  readonly email: string;

  constructor(student: Students) {
    this.name = student.name;
    this.email = student.email;
  }
}
