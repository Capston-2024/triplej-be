import { Repository } from 'typeorm';
import { Student } from '../entity/student.entity';

export class StudentRepository extends Repository<Student> {}
