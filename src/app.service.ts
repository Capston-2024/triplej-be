import { HttpStatus, Injectable } from '@nestjs/common';
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
import { ApplyJobRequest } from './module/dto/apply_job.dto';
import { Response } from './common/response';
import { EntityManager } from 'typeorm';

@Injectable()
export class AppService {
  constructor(
    private entityManager: EntityManager,
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

  async calcPickinScore() {
    // todo - pickin 지수 계산
    return [0, 1, 2];
  }

  async calcMatch(letter: string) {
    // todo - 키워드 매칭 비율 및 의미 매칭 비율 계산
    return [0, letter.length];
  }

  async applyJob(applyJobReq: ApplyJobRequest) {
    // Check Student
    const student = await this.studentsRepository.findOneBy({
      email: applyJobReq.email,
    });
    if (!student) {
      return Response.error(
        HttpStatus.BAD_REQUEST,
        '잘못된 유학생 정보입니다.',
      );
    }

    // Check Job
    const job = await this.jobsRepository.findOneBy({ id: applyJobReq.jobId });
    if (!job) {
      return Response.error(HttpStatus.BAD_REQUEST, '잘못된 공고 정보입니다.');
    }

    // Apply
    return await this.entityManager.transaction(async (manager) => {
      // Calculate Pickin Score & Match
      const [scoreA, scoreB, scoreC] = await this.calcPickinScore();
      const [keywordMatch, meaningMatch] = await this.calcMatch(
        applyJobReq.letter,
      );

      // Check StudentJob Data
      const studentJob = await this.studentJobRepository.findOne({
        where: {
          student: student,
          job: job,
        },
        relations: ['scores, letters, resumes, portfolios'],
      });

      if (!studentJob) {
        // Add StudentJob Data
        const newStudentJob = new StudentJob();
        newStudentJob.student = student;
        newStudentJob.job = job;
        newStudentJob.like = false;
        const savedStudentJob = await manager.save(StudentJob, newStudentJob);

        // Add Letter with Match
        const newLetter = new Letter();
        newLetter.studentJob = savedStudentJob;
        newLetter.keywordMatch = keywordMatch;
        newLetter.meaningMatch = meaningMatch;
        newLetter.letter = applyJobReq.letter;
        await manager.save(Letter, newLetter);

        if (applyJobReq.resume) {
          // Add Resume
          const newResume = new Resume();
          newResume.studentJob = savedStudentJob;
          newResume.fileLink = applyJobReq.resume;
          await manager.save(Resume, newResume);
        }

        if (applyJobReq.portfolio) {
          // Add Portfolio
          const newPortfolio = new Portfolio();
          newPortfolio.studentJob = savedStudentJob;
          newPortfolio.fileLink = applyJobReq.portfolio;
          await manager.save(Portfolio, newPortfolio);
        }
      } else {
        // Update Letter with Match
        await manager.update(
          Letter,
          { studentJobId: studentJob.id },
          {
            keywordMatch: keywordMatch,
            meaningMatch: meaningMatch,
            letter: applyJobReq.letter,
          },
        );

        if (studentJob.resume) {
          // Update Resume
          await manager.update(
            Resume,
            { studentJobId: studentJob.id },
            { fileLink: applyJobReq.resume },
          );
        } else {
          // Add Resume
          const newResume = new Resume();
          newResume.studentJob = studentJob;
          newResume.fileLink = applyJobReq.resume;
          await manager.save(Resume, newResume);
        }

        if (studentJob.portfolio) {
          // Update Portfolio
          await manager.update(
            Portfolio,
            { studentJobId: studentJob.id },
            { fileLink: applyJobReq.portfolio },
          );
        } else {
          // Add Portfolio
          const newPortfolio = new Portfolio();
          newPortfolio.studentJob = studentJob;
          newPortfolio.fileLink = applyJobReq.portfolio;
          await manager.save(Portfolio, newPortfolio);
        }
      }

      if (studentJob.score) {
        // Update Score
        await manager.update(
          Score,
          { studentJobId: studentJob.id },
          { scoreA: scoreA, scoreB: scoreB, scoreC: scoreC },
        );
      } else {
        // Add Score
        const newScore = new Score();
        newScore.scoreA = scoreA;
        newScore.scoreB = scoreB;
        newScore.scoreC = scoreC;
        await manager.save(Score, newScore);
      }
    });
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
