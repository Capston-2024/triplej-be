import { Repository } from 'typeorm';
import { Jobs } from '../entity/jobs.entity';

export class JobsRepository extends Repository<Jobs> {}
