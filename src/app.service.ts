import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Job } from './module/entity/job.entity';
import { JobRepository } from './module/repository/job.repository';
import { Student } from './module/entity/student.entity';
import { StudentRepository } from './module/repository/student.repository';
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

  async login() {
    // 로그인 API
  }

  async signUp() {
    // 회원가입 API
  }

  async applyJob() {
    // 지원하기 API
  }

  async getUserInfo() {
    // 회원정보 조회 API
  }

  async getApplicationStatusList() {
    // 지원현황 조회 API
  }

  async getJobPostingList() {
    // 전체 채용공고 조회 API & 관심공고 조회 API
  }
}
