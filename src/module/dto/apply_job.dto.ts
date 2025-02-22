import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ApplyJobRequest {
  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsNumber()
  readonly jobId: number;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsString()
  readonly email: string;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsString()
  readonly letter: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  readonly resume: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  readonly portfolio: string;
}
