import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Jobs } from './module/entity/jobs.entity';
import { JobsRepository } from './module/repository/jobs.repository';
import { Students } from './module/entity/students.entity';
import { StudentsRepository } from './module/repository/students.repository';
import { SigninRequest } from './module/dto/signin.dto';
import { GetJobsResponse } from './module/dto/get_jobs.dto';

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(Jobs)
    private jobsRepository: JobsRepository,
    @InjectRepository(Students)
    private studentsRepository: StudentsRepository,
  ) {}

  async signIn(signinReq: SigninRequest) {
    const student = new Students();
    student.name = signinReq.name;
    student.nationality = signinReq.nationality;
    student.email = signinReq.email;
    student.password = signinReq.password;
    student.education = signinReq.education;
    student.major = signinReq.major;
    student.visa = signinReq.visa;
    student.topikLevel = signinReq.topikLevel;
    student.tags = signinReq.tags;
    return await this.studentsRepository.save(student);
  }

  async getJobs() {
    const jobs = await this.jobsRepository.find();

    const response: GetJobsResponse[] = [];
    for (const j of jobs) {
      const res = new GetJobsResponse(j);
      response.push(res);
    }
    return response;
  }
}
