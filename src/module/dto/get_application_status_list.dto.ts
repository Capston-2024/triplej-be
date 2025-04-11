import { StudentJob } from '../entity/student_job.entity';
import { ApiProperty } from '@nestjs/swagger';
import { ApplyStatus } from '../enums/apply_status';

export class ApplicationStats {
  @ApiProperty({
    example: 0,
    description: '회원의 총 지원 완료 공고 수',
    required: true,
  })
  readonly applied: number;

  @ApiProperty({
    example: 1,
    description: '회원의 총 채용 진행 중 공고 수',
    required: true,
  })
  readonly inProgress: number;

  @ApiProperty({
    example: 2,
    description: '회원의 최종 합격 공고 수',
    required: true,
  })
  readonly hired: number;

  @ApiProperty({
    example: 2,
    description: '회원의 불합격 공고 수',
    required: true,
  })
  readonly rejected: number;

  constructor(results: StudentJob[]) {
    this.applied = results.filter(
      (r) => r.status == ApplyStatus.APPLIED,
    ).length;
    this.inProgress = results.filter(
      (r) => r.status == ApplyStatus.IN_PROGRESS,
    ).length;
    this.hired = results.filter((r) => r.status == ApplyStatus.HIRED).length;
    this.rejected = results.filter(
      (r) => r.status == ApplyStatus.REJECTED,
    ).length;
  }
}

export class Application {
  @ApiProperty({
    example: 3,
    description: '공고 ID',
    required: true,
  })
  readonly jobId: number;

  @ApiProperty({
    example: '카카오스타일',
    description: '해당 공고에 대한 회사명',
    required: true,
  })
  readonly companyName: string;

  @ApiProperty({
    example: '인도네시아 콘텐츠 로컬라이징 & 사업개발 매니저',
    description: '공고 제목',
    required: true,
  })
  readonly title: string;

  @ApiProperty({
    example: '검토 중',
    description: '해당 공고의 진행 상태',
    required: true,
  })
  readonly status: string;

  constructor(result: StudentJob) {
    this.jobId = result.job.id;
    this.companyName = result.job.company.companyName;
    this.title = result.job.title;
    this.status = result.status;
  }
}

export class GetApplicationStatusListResponse {
  @ApiProperty({
    example: {
      applied: 0,
      inProgress: 1,
      hired: 2,
      rejected: 1,
    },
    description: '회원의 공고 지원 상태',
    required: true,
  })
  readonly applicationStats: ApplicationStats;

  @ApiProperty({
    example: [
      {
        jobId: 3,
        companyName: '카카오스타일',
        title: '인도네시아 콘텐츠 로컬라이징 & 사업개발 매니저',
        status: '검토 중',
      },
    ],
    description: '회원의 지원 공고 정보',
    required: true,
  })
  readonly applicationList: Application[];
  constructor(result: StudentJob[]) {
    this.applicationStats = new ApplicationStats(result);
    this.applicationList = result.map((r) => new Application(r));
  }
}
