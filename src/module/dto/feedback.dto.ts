import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class FeedbackRequest {
  @ApiProperty({
    example: 1,
    description: '공고 ID',
    required: true,
  })
  @IsNotEmpty()
  @IsNumber()
  readonly jobId: number;
}

export class FeedbackResponse {
  @ApiProperty({
    example: '지원자가 작성한 자기소개서',
    description: '첨삭 이전의 자기소개서',
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  before: string;

  @ApiProperty({
    example: 'AI를 통해 첨삭된 자기소개서',
    description: '첨삭 이후의 자기소개서',
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  after: string;

  @ApiProperty({
    example: 'AI 답변 전체',
    description: 'AI가 도출한 피드백 전체',
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  feedback: string;
}
