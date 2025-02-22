import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { StudentJob } from './student_job.entity';

@Entity()
export class Portfolio {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => StudentJob, (studentJob) => studentJob.portfolios)
  @JoinColumn({ name: 'student_job_id' })
  studentJob: StudentJob;

  @Column({ type: 'varchar', nullable: false })
  fileLink: string;
}
