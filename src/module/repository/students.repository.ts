import { Repository } from 'typeorm';
import { Student } from '../entity/student.entity';

export class StudentsRepository extends Repository<Student> {}
