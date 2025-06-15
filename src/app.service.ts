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
import { ApplyStatus } from './module/enums/apply_status';
import { GetApplicationStatusListResponse } from './module/dto/get_application_status_list.dto';
import { GetJobPostingListResponse } from './module/dto/get_job_posting_list.dto';
import { GetUserInfoResponse } from './module/dto/get_user_auth_info.dto';
import { LoginRequest } from './module/dto/login.dto';
import * as bcrypt from 'bcryptjs';
import { SignUpRequest } from './module/dto/sing_up.dto';
import { Feedback } from './module/entity/feedback.entity';
import { FeedbackRepository } from './module/repository/feedback.repository';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom } from 'rxjs';
import { FeedbackResponse } from './module/dto/feedback.dto';

@Injectable()
export class AppService {
  private readonly feedbackApiUrl: string;

  constructor(
    private entityManager: EntityManager,
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
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
    @InjectRepository(Feedback)
    private feedbackRepository: FeedbackRepository,
  ) {
    this.feedbackApiUrl = this.configService.get<string>('FEEDBACK_URL');
  }

  async hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(10); // create salt
    return bcrypt.hash(password, salt);
  }

  async comparePassword(
    password: string,
    hashedPassword: string,
  ): Promise<boolean> {
    return bcrypt.compare(password, hashedPassword);
  }

  async login(loginReq: LoginRequest) {
    //Check Student
    const student = await this.studentsRepository.findOneBy({
      email: loginReq.email,
    });
    if (!student) {
      return Response.error(
        HttpStatus.BAD_REQUEST,
        '잘못된 유학생 정보입니다.',
      );
    }

    //Check Password
    if (await this.comparePassword(loginReq.password, student.password)) {
      return true;
    } else {
      return Response.error(HttpStatus.BAD_REQUEST, '잘못된 비밀번호입니다.');
    }
  }

  async signUp(signUpReq: SignUpRequest) {
    //Check Email Unique
    const student = await this.studentsRepository.findOneBy({
      email: signUpReq.email,
    });
    if (student) {
      return Response.error(
        HttpStatus.BAD_REQUEST,
        '이미 존재하는 유학생 정보입니다.',
      );
    }

    //Add Student Data
    return await this.entityManager.transaction(async (manager) => {
      const newStudent = new Student();
      newStudent.email = signUpReq.email;
      newStudent.password = await this.hashPassword(signUpReq.password);
      newStudent.firstName = signUpReq.firstName;
      newStudent.lastName = signUpReq.lastName;
      newStudent.nationality = signUpReq.nationality;
      newStudent.language = signUpReq.language;
      newStudent.degree = signUpReq.degree;
      newStudent.college = signUpReq.college;
      newStudent.major = signUpReq.major;
      newStudent.visa = signUpReq.visa;
      newStudent.topik = signUpReq.topik;
      await manager.save(Student, newStudent);
    });
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
        newStudentJob.status = ApplyStatus.APPLIED;
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
        // Update StudentJob Data
        await manager.update(
          StudentJob,
          { id: studentJob.id },
          { status: ApplyStatus.APPLIED },
        );

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

  async likeJob(jobId: number, email: string) {
    // Check Student
    const student = await this.studentsRepository.findOneBy({
      email: email,
    });
    if (!student) {
      return Response.error(
        HttpStatus.BAD_REQUEST,
        '잘못된 유학생 정보입니다.',
      );
    }

    // Check Job
    const job = await this.jobsRepository.findOneBy({ id: jobId });
    if (!job) {
      return Response.error(HttpStatus.BAD_REQUEST, '잘못된 공고 정보입니다.');
    }

    // Like or Unlike
    return await this.entityManager.transaction(async (manager) => {
      // Check StudentJob Data
      const studentJob = await this.studentJobRepository.findOne({
        where: {
          student: student,
          job: job,
        },
      });

      await manager.update(
        StudentJob,
        { id: studentJob.id },
        { like: !studentJob.like },
      );
    });
  }

  async getUserInfo(email: string) {
    // Check Student
    const student = await this.studentsRepository.findOneBy({
      email: email,
    });
    if (!student) {
      return Response.error(
        HttpStatus.BAD_REQUEST,
        '잘못된 유학생 정보입니다.',
      );
    }

    return new GetUserInfoResponse(student);
  }

  async getApplicationStatusList(email: string) {
    // Check Student
    const student = await this.studentsRepository.findOneBy({
      email: email,
    });
    if (!student) {
      return Response.error(
        HttpStatus.BAD_REQUEST,
        '잘못된 유학생 정보입니다.',
      );
    }

    // Find Student's StudentJob Data
    const result = await this.studentJobRepository
      .createQueryBuilder('sj')
      .leftJoinAndSelect('sj.job', 'jobs')
      .leftJoinAndSelect('jobs.company', 'companies')
      .where('sj.student = :id', { id: student.id })
      .getMany();

    return new GetApplicationStatusListResponse(result);
  }

  async getJobPostingList(email: string) {
    // Check Student
    const student = await this.studentsRepository.findOneBy({
      email: email,
    });

    if (!student) {
      // Find Job Postings
      const result = await this.studentJobRepository.find({
        relations: ['job', 'job.company'],
      });

      return result.map((r) => new GetJobPostingListResponse(r, false));
    } else {
      // Find Job Postings with User Data
      const result = await this.studentJobRepository.find({
        where: { student: student },
        relations: ['job', 'score', 'job.company'],
      });

      return result.map((r) => new GetJobPostingListResponse(r, true));
    }
  }

  async feedbackTest() {
    const target = await this.feedbackRepository.findOneBy({ id: 1 });
    let feedbackRes = null;

    // Call Feedback API
    try {
      feedbackRes = await firstValueFrom(
        this.httpService.post(this.feedbackApiUrl, target),
      );
    } catch (err) {
      throw new Error(err.message);
    }

    const response = new FeedbackResponse();
    response.before = target.letter;
    response.after = feedbackRes.data;

    return response;
  }
}
