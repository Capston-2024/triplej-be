import { Repository } from 'typeorm';
import { Job } from '../entity/job.entity';

export class JobsRepository extends Repository<Job> {}
