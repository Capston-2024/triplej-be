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

  @Column({ name: 'pickin_score', type: 'int', nullable: false })
  pickinScore: number;
}
