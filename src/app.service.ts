import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Jobs } from './module/entity/jobs.entity';
import { JobsRepository } from './module/repository/jobs.repository';
import { Students } from './module/entity/students.entity';
import { StudentsRepository } from './module/repository/students.repository';
import { SigninRequest } from './module/dto/signin.dto';

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(Jobs)
    private jobsRepository: JobsRepository,
    @InjectRepository(Students)
    private studentsRepository: StudentsRepository,
  ) {}

  async signIn(signinReq: SigninRequest) {
    return 'signin';
  }

  async getJobs() {
    return 'get jobs';
  }
}
