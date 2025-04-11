import { ApiProperty } from '@nestjs/swagger';
import { Student } from '../entity/student.entity';

export class GetUserInfoResponse {
  @ApiProperty({ example: 'pickin@gmail.com', description: '회원의 이메일' })
  readonly email: string;

  @ApiProperty({ example: 'Sarah', description: '회원의 이름' })
  readonly firstName: string;

  @ApiProperty({ example: 'Weiss', description: '회원의 성' })
  readonly lastName: string;

  @ApiProperty({ example: '영국', description: '회원의 국적' })
  readonly nationality: string;

  @ApiProperty({ example: 'German', description: '회원의 제1언어' })
  readonly language: string;

  @ApiProperty({ example: '학사', description: '회원의 최종학력' })
  readonly degree: string;

  @ApiProperty({ example: '서울가톨릭대학교', description: '회원의 대학' })
  readonly college: string;

  @ApiProperty({ example: '컴퓨터공학과', description: '회원의 전공' })
  readonly major: string;

  @ApiProperty({ example: 'D2', description: '회원의 현재 소유 비자' })
  readonly visa: string;

  @ApiProperty({ example: '5', description: '회원의 TOPIK 등급' })
  readonly topik: string;

  constructor(result: Student) {
    this.email = result.email;
    this.firstName = result.firstName;
    this.lastName = result.lastName;
    this.nationality = result.nationality;
    this.language = result.language;
    this.degree = result.degree;
    this.college = result.college;
    this.major = result.major;
    this.visa = result.visa;
    this.topik = result.topik;
  }
}

export class GetUserAuthInfoResponse {}