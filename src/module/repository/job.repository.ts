import { Repository } from 'typeorm';
import { Job } from '../entity/job.entity';

export class JobRepository extends Repository<Job> {}
