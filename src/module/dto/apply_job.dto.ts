import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ApplyJobRequest {
  @ApiProperty({
    example: 1,
    description: '공고 ID',
    required: true,
  })
  @IsNotEmpty()
  @IsNumber()
  readonly jobId: number;

  @ApiProperty({
    example: 'pickin@gmail.com',
    description: '회원의 이메일',
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  readonly email: string;

  @ApiProperty({
    example: '자신을 소개하는 글을 500자 이내로 작성해주세요.',
    description: '자기소개서',
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  readonly letter: string;

  @ApiProperty({
    example: 'data:application/pdf;base64,JVBERi0xLjMKJcTl8uXrp/Og0MTGC...',
    description: '이력서',
    required: false,
  })
  @IsOptional()
  @IsString()
  readonly resume: string;

  @ApiProperty({
    example: 'data:appliccation/pdf;base64,JVBERi0xLjMKJcTl8uXrp/Og0MTFSJC...',
    description: '포트폴리오',
    required: false,
  })
  @IsOptional()
  @IsString()
  readonly portfolio: string;
}
