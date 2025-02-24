import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginRequest {
  @ApiProperty({
    example: 'user@example.com',
    description: '로그인할 이메일',
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  readonly email: string;

  @ApiProperty({
    example: 'userpassword',
    description: '로그인할 비밀번호',
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  readonly password: string;
}
