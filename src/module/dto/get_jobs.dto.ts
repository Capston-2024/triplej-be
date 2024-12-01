import { Jobs } from '../entity/jobs.entity';

export class GetJobsResponse {
  readonly id: number;
  readonly companyName: string;
  readonly title: string;
  readonly tags: string[];
  readonly endAt: Date;
  readonly imgSrc: string;
  readonly jobDetail: string;

  constructor(job: Jobs) {
    this.id = job.id;
    this.companyName = job.companyName;
    this.title = job.title;
    this.tags = job.tags;
    this.endAt = job.endAt;
    this.imgSrc = job.imgSrc;
    this.jobDetail = job.jobDetail;
  }
}
