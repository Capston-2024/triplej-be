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
  private readonly predictApiUrl: string;

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
    this.predictApiUrl = this.configService.get<string>(
      'PREDICT_API_PREDICTION',
    );
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

  async calcPickinScore(userId: number) {
    let predictRes = null;

    // Call Feedback API
    try {
      predictRes = await firstValueFrom(
        this.httpService.post(this.predictApiUrl, {
          applicant_id: userId,
        }),
      );
      return predictRes.data;
    } catch (err) {
      throw new Error(err.message);
    }
  }

  async calcMatch(letter: string) {
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
      const [keywordMatch, meaningMatch] = await this.calcMatch(
        applyJobReq.letter,
      );

      // Check StudentJob Data
      let studentJob = await this.studentJobRepository.findOne({
        where: {
          student: { id: student.id },
          job: { id: job.id },
        },
        relations: ['score', 'letter', 'resume', 'portfolio'],
      });

      if (!studentJob) {
        // Add StudentJob Data
        const newStudentJob = new StudentJob();
        newStudentJob.student = student;
        newStudentJob.job = job;
        newStudentJob.like = false;
        newStudentJob.status = ApplyStatus.APPLIED;
        studentJob = await manager.save(StudentJob, newStudentJob);
      } else {
        await manager.update(
          StudentJob,
          { id: studentJob.id },
          { status: ApplyStatus.APPLIED },
        );
      }

      const letter = await this.letterRepository.findOne({
        where: {
          studentJob: { id: studentJob.id },
        },
      });

      if (!letter) {
        // Add Letter with Match
        const newLetter = new Letter();
        newLetter.studentJob = studentJob;
        newLetter.keywordMatch = keywordMatch;
        newLetter.meaningMatch = meaningMatch;
        newLetter.letter = applyJobReq.letter;
        await manager.save(Letter, newLetter);
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
      }

      if (applyJobReq.resume) {
        const resume = await this.resumeRepository.findOne({
          where: {
            studentJob: { id: studentJob.id },
          },
        });

        if (!resume) {
          // Add Resume
          const newResume = new Resume();
          newResume.studentJob = studentJob;
          newResume.fileLink = applyJobReq.resume;
          await manager.save(Resume, newResume);
        } else {
          // Update Resume
          await manager.update(
            Resume,
            { studentJobId: studentJob.id },
            { fileLink: applyJobReq.resume },
          );
        }
      }

      if (applyJobReq.portfolio) {
        const portfolio = await this.portfolioRepository.findOne({
          where: {
            studentJob: { id: studentJob.id },
          },
        });

        if (!portfolio) {
          // Add Portfolio
          const newPortfolio = new Portfolio();
          newPortfolio.studentJob = studentJob;
          newPortfolio.fileLink = applyJobReq.portfolio;
          await manager.save(Portfolio, newPortfolio);
        } else {
          // Update Portfolio
          await manager.update(
            Portfolio,
            { studentJobId: studentJob.id },
            { fileLink: applyJobReq.portfolio },
          );
        }
      }
    });
  }

  async matchStudentJob(email: string) {
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

    // Apply
    return await this.entityManager.transaction(async (manager) => {
      // Calculate Pickin Score & Match
      const pickinResults = await this.calcPickinScore(student.id);
      const allJobs = await this.jobsRepository.find(); // 전체 공고 가져오기

      for (const job of allJobs) {
        const result = pickinResults.find((item) => item.채용공고id === job.id);
        if (!result) continue; // 해당 공고에 대한 pickin 지수가 없으면 skip
        const studentJobScore = Math.round(result.pickin지수 * 100);

        // studentJob이 존재하는지 확인
        const studentJob = await this.studentJobRepository.findOne({
          where: {
            student: { id: student.id },
            job: { id: job.id },
          },
        });

        if (studentJob) continue;

        const newStudentJob = new StudentJob();
        newStudentJob.student = student;
        newStudentJob.job = job;
        newStudentJob.like = false;
        newStudentJob.status = ApplyStatus.NONE;
        const savedStudentJob = await manager.save(StudentJob, newStudentJob);

        // Add Score
        const newScore = new Score();
        newScore.studentJob = savedStudentJob;
        newScore.pickinScore = studentJobScore;
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
          student: { id: student.id },
          job: { id: job.id },
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

    if (email && student) {
      await this.matchStudentJob(email);
      // Find Job Postings
      const result = await this.studentJobRepository.find({
        where: { student: { id: student.id } },
        relations: ['student', 'job', 'job.company', 'score'],
      });

      return result.map((r) => new GetJobPostingListResponse(r, true));
    } else {
      // Find Job Postings with User Data
      const result = await this.studentJobRepository.find({
        relations: ['job', 'score', 'job.company'],
      });

      const seenJobIds = new Set<number>();

      const uniqueResult = result.filter((r) => {
        if (seenJobIds.has(r.job.id)) {
          return false; // 이미 처리한 jobId는 제외
        }
        seenJobIds.add(r.job.id);
        return true;
      });

      return uniqueResult.map((r) => new GetJobPostingListResponse(r, false));
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
