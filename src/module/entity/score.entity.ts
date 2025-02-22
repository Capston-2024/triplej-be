import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { StudentJob } from './student_job.entity';

@Entity()
export class Score {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToOne(() => StudentJob, (studentJob) => studentJob.score)
  @JoinColumn({ name: 'student_job_id' })
  studentJob: StudentJob;

  @Column({ type: 'int', nullable: false })
  scoreA: number;

  @Column({ type: 'int', nullable: false })
  scoreB: number;

  @Column({ type: 'int', nullable: false })
  scoreC: number;
}
