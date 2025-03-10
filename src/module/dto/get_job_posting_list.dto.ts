import { ApiProperty } from '@nestjs/swagger';
import { Company } from '../entity/company.entity';
import { StudentJob } from '../entity/student_job.entity';

export class CompanyInfo {
  @ApiProperty({
    example: '카카오스타일',
    description: '회사명',
    required: true,
  })
  readonly name: string;

  @ApiProperty({
    example:
      '지그재그를 운영하는 크로키닷컴이 카카오스타일로 새로운 도약을 시작합니다. 모두가 더 편하게 나만의 스타일을 찾을 수 있도록 일상의 모든 순간에 카카오스타일이 함께하겠습니다.',
    description: '회사 정보',
    required: true,
  })
  readonly info: string;

  @ApiProperty({
    example: ['패션', '뷰티', '라이프'],
    description: '회사 산업군',
    required: true,
  })
  readonly tags: string[];

  constructor(company: Company) {
    this.name = company.companyName;
    this.info = company.companyInfo;
    this.tags = company.tags;
  }
}

export class UserInfo {
  @ApiProperty({
    example: false,
    description: '해당 공고 저장 여부',
    required: true,
  })
  readonly liked: boolean;

  @ApiProperty({
    example: 72,
    description: "해당 공고에 대한 회원의 Pickin\' 지수",
    required: true
  })
  readonly pickinScore: number;

  constructor(result: StudentJob) {
    this.liked = result.like;
    this.pickinScore =
      result.score.scoreA + result.score.scoreB + result.score.scoreC; // todo - 계산식 적용
  }
}

export class GetJobPostingListResponse {
  @ApiProperty({
    example: 1,
    description: '공고 ID',
    required: true,
  })
  readonly jobId: number;

  @ApiProperty({
    example:
      '[주 1~2 출근,재택업무]해외 마켓플레이스(아마존 등)입점,운영,마케팅',
    description: '공고 제목',
    required: true,
  })
  readonly jobTitle: string;

  @ApiProperty({
    example: ['대면 근무', '계약직', '경기 판교'],
    description: '회사 산업군',
    required: true,
  })
  readonly employments: string[];

  @ApiProperty({
    example: ['마케팅', '광고', '홍보'],
    description: '직무',
    required: true,
  })
  readonly works: string[];

  @ApiProperty({
    example: ['인도네시아어', '홍콩어', '대만어'],
    description: '필요 언어',
    required: true,
  })
  readonly languages: string[];

  @ApiProperty({
    example: ['D-2', 'D-4', 'D-6'],
    description: '비자 자격 요건',
    required: true,
  })
  readonly visas: string[];

  @ApiProperty({
    example: ['해외대 우대'],
    description: '우대 사항',
    required: true,
  })
  readonly preferences: string[];

  @ApiProperty({
    example:
      "AI 기술을 기반으로 선호 쇼핑몰, 관심 상품, 구매 이력 등에 따른 개인 맞춤형 추천 상품을 제공하여 유저들의 구매 여정을 유의미한 경험으로 만들어가고 있습니다. 또한, 4050 세대를 위한 '포스티' 플랫폼을 통해 더 다양한 연령층을 포괄하는 국내 대표 스타일 커머스 기업으로 성장하고자 합니다.",
    description: '직무 정보',
    required: true,
  })
  readonly jobInfo: string;

  @ApiProperty({
    example: {
      name: '카카오스타일',
      info: '지그재그를 운영하는 크로키닷컴이 카카오스타일로 새로운 도약을 시작합니다.  모두가 더 편하게 나만의 스타일을 찾을 수 있도록 일상의 모든 순간에 카카오스타일이 함께하겠습니다.',
      tags: ['패션', '뷰티', '라이프'],
    },
    description: '해당 공고에 대한 회사 정보',
    required: true,
  })
  readonly company: CompanyInfo;

  @ApiProperty({
    example: {
      liked: false,
      pickinScore: 72,
    },
    description: '해당 공고에 대한 회원 정보',
  })
  readonly user: UserInfo;

  constructor(result: StudentJob, needUserInfo: boolean) {
    this.jobId = result.job.id;
    this.jobTitle = result.job.title;
    this.employments = result.job.employments;
    this.works = result.job.works;
    this.languages = result.job.languages;
    this.visas = result.job.visas;
    this.preferences = result.job.preferences;
    this.jobInfo = result.job.jobInfo;
    this.company = new CompanyInfo(result.job.company);
    if (!needUserInfo) {
      this.user = null;
    } else {
      this.user = new UserInfo(result);
    }
  }
}
