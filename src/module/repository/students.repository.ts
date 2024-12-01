import { Repository } from 'typeorm';
import { Students } from '../entity/students.entity';

export class StudentsRepository extends Repository<Students> {}
