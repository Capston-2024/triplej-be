import { StudentJob } from '../entity/student_job.entity';
import { ApiProperty } from '@nestjs/swagger';
import { ApplyStatus } from '../enums/apply_status';

export class ApplicationStats {
  @ApiProperty()
  readonly applied: number;

  @ApiProperty()
  readonly inProgress: number;

  @ApiProperty()
  readonly hired: number;

  @ApiProperty()
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
  @ApiProperty()
  readonly jobId: number;

  @ApiProperty()
  readonly companyName: string;

  @ApiProperty()
  readonly title: string;

  @ApiProperty()
  readonly status: string;

  constructor(result: StudentJob) {
    this.jobId = result.job.id;
    this.companyName = result.job.company.companyName;
    this.title = result.job.title;
    this.status = result.status;
  }
}

export class GetApplicationStatusListResponse {
  @ApiProperty()
  readonly applicationStats: ApplicationStats;

  @ApiProperty()
  readonly applicationList: Application[];
  constructor(result: StudentJob[]) {
    this.applicationStats = new ApplicationStats(result);
    this.applicationList = result.map((r) => new Application(r));
  }
}
