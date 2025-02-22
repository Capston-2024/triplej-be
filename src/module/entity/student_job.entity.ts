import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Student } from './student.entity';
import { Job } from './job.entity';
import { Score } from './score.entity';
import { Letter } from './letter.entity';
import { Resume } from './resume.entity';
import { Portfolio } from './portfolio.entity';
import { ApplyStatus } from '../enums/apply_status';

@Entity()
export class StudentJob {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => Student)
  @JoinColumn({ name: 'student_id' })
  student: Student;

  @ManyToOne(() => Job)
  @JoinColumn({ name: 'job_id' })
  job: Job;

  @Column({ type: 'boolean', nullable: false })
  like: boolean;

  @Column({ type: 'enum', enum: ApplyStatus, default: ApplyStatus.NONE })
  status: ApplyStatus;

  @OneToOne(() => Score, (score) => score.studentJob)
  score: Score;

  @OneToOne(() => Letter, (letter) => letter.studentJob)
  letter: Letter;

  @OneToOne(() => Resume, (resume) => resume.studentJob)
  resume: Resume;

  @OneToOne(() => Portfolio, (portfolio) => portfolio.studentJob)
  portfolio: Portfolio;
}
