import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Jobs } from './module/entity/jobs.entity';
import { JobsRepository } from './module/repository/jobs.repository';
import { Students } from './module/entity/students.entity';
import { StudentsRepository } from './module/repository/students.repository';
import { SigninRequest, SigninResponse } from './module/dto/signin.dto';
import { GetJobsResponse } from './module/dto/get_jobs.dto';
import { JobRequest, PredictRequest } from './module/dto/predict.dto';

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
    student.name = signinReq.userData.name;
    student.nationality = signinReq.userData.nationality;
    student.email = signinReq.userData.email;
    student.password = signinReq.userData.password;
    student.education = signinReq.userData.education;
    student.major = signinReq.userData.major;
    student.visa = signinReq.userData.visa;
    student.topikLevel = signinReq.userData.topik;
    student.tags = signinReq.userData.interestTags;
    await this.studentsRepository.save(student);

    return new SigninResponse(student);
  }

  async getJobs(userData: JobRequest) {
    const jobs = await this.jobsRepository.find();

    const predictData: PredictRequest = new PredictRequest(userData);

    const response: GetJobsResponse[] = [];
    for (const j of jobs) {
      let prediction = await this.predict(predictData);
      if (j.tags.includes(predictData.work) && prediction == 0) {
        prediction = 1;
      } else if (!j.tags.includes(predictData.work) && prediction == 1) {
        prediction = 0;
      }
      const res = new GetJobsResponse(j, prediction);
      response.push(res);
    }
    return response;
  }

  async predict(userData: PredictRequest) {
    const response = await fetch('http://localhost:8000/predict', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      throw new HttpException('predict error', HttpStatus.BAD_REQUEST);
    }

    const data = await response.json();

    return data.prediction;
  }
}
