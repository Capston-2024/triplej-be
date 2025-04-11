import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class SignUpRequest {
  @ApiProperty({
    example: 'pickin@gmail.com',
    description: '회원가입할 이메일',
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  readonly email: string;

  @ApiProperty({
    example: 'abc1234567',
    description: '회원가입할 비밀번호',
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  readonly password: string;

  @ApiProperty({
    example: 'Sarah',
    description: '회원가입 이름',
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  readonly firstName: string;

  @ApiProperty({
    example: 'Weiss',
    description: '회원의 성',
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  readonly lastName: string;

  @ApiProperty({
    example: '영국',
    description: '회원의 국적',
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  readonly nationality: string;

  @ApiProperty({
    example: 'German',
    description: '회원의 제1언어',
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  readonly language: string;

  @ApiProperty({
    example: '학사',
    description: '회원의 최종학력',
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  readonly degree: string;

  @ApiProperty({
    example: '서울가톨릭대학교',
    description: '회원의 대학교',
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  readonly college: string;

  @ApiProperty({
    example: '컴퓨터공학과',
    description: '회원의 전공',
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  readonly major: string;

  @ApiProperty({
    example: 'D2',
    description: '회원의 현재 소유 비자',
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  readonly visa: string;

  @ApiProperty({
    example: '5',
    description: '회원의 TOPIK등급',
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  readonly topik: string;
}
