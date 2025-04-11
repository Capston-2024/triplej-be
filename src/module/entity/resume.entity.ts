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
export class Resume {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToOne(() => StudentJob, (studentJob) => studentJob.resume)
  @JoinColumn({ name: 'student_job_id' })
  studentJob: StudentJob;

  @Column({ type: 'varchar', nullable: false })
  fileLink: string;
}
