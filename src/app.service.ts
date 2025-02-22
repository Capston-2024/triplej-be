import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Job } from './module/entity/job.entity';
import { JobRepository } from './module/repository/job.repository';
import { Student } from './module/entity/student.entity';
import { StudentRepository } from './module/repository/student.repository';
import { SigninRequest } from './module/dto/signin.dto';
import { JobRequest, PredictRequest } from './module/dto/predict.dto';
import { JobDto } from './module/dto/add_job.dto';
import { Company } from './module/entity/company.entity';
import { CompanyRepository } from './module/repository/company.repository';
import { Letter } from './module/entity/letter.entity';
import { LetterRepository } from './module/repository/letter.repository';
import { Portfolio } from './module/entity/portfolio.entity';
import { PortfolioRepository } from './module/repository/portfolio.repository';
import { Resume } from './module/entity/resume.entity';
import { ResumeRepository } from './module/repository/resume.repository';
import { Score } from './module/entity/score.entity';
import { ScoreRepository } from './module/repository/score.repository';
import { StudentJob } from './module/entity/student_job.entity';
import { StudentJobRepository } from './module/repository/student_job.repository';

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(Company) private companyRepository: CompanyRepository,
    @InjectRepository(Job)
    private jobsRepository: JobRepository,
    @InjectRepository(Letter) private letterRepository: LetterRepository,
    @InjectRepository(Portfolio)
    private portfolioRepository: PortfolioRepository,
    @InjectRepository(Resume) private resumeRepository: ResumeRepository,
    @InjectRepository(Score) private scoreRepository: ScoreRepository,
    @InjectRepository(Student)
    private studentsRepository: StudentRepository,
    @InjectRepository(StudentJob)
    private studentJobRepository: StudentJobRepository,
  ) {}

  async signIn(signinReq: SigninRequest) {
    /*
    const student = new Student();
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
     */
  }

  async getJobs(userData: JobRequest) {
    /*
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
     */
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

  async addJob(jobData: JobDto) {
    /*
    const job = new Jobs();
    job.companyName = jobData.companyName;
    job.title = jobData.title;
    job.tags = jobData.tags;
    job.endAt = jobData.endAt;
    job.imgSrc = jobData.imgSrc;
    job.jobDetail = jobData.jobDetail;
    await this.jobsRepository.save(job);
     */
  }
}
