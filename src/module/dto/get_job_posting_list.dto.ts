import { ApiProperty } from '@nestjs/swagger';
import { Company } from '../entity/company.entity';
import { StudentJob } from '../entity/student_job.entity';

export class CompanyInfo {
  @ApiProperty()
  readonly name: string;

  @ApiProperty()
  readonly info: string;

  @ApiProperty()
  readonly tags: string[];

  constructor(company: Company) {
    this.name = company.companyName;
    this.info = company.companyInfo;
    this.tags = company.tags;
  }
}

export class UserInfo {
  @ApiProperty()
  readonly liked: boolean;

  @ApiProperty()
  readonly pickinScore: number;

  constructor(result: StudentJob) {
    this.liked = result.like;
    this.pickinScore =
      result.score.scoreA + result.score.scoreB + result.score.scoreC; // todo - 계산식 적용
  }
}

export class GetJobPostingListResponse {
  @ApiProperty()
  readonly jobId: number;

  @ApiProperty()
  readonly jobTitle: string;

  @ApiProperty()
  readonly employments: string[];

  @ApiProperty()
  readonly works: string[];

  @ApiProperty()
  readonly languages: string[];

  @ApiProperty()
  readonly visas: string[];

  @ApiProperty()
  readonly preferences: string[];

  @ApiProperty()
  readonly jobInfo: string;

  @ApiProperty()
  readonly company: CompanyInfo;

  @ApiProperty()
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
