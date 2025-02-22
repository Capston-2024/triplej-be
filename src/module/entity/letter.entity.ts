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
export class Letter {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => StudentJob, (studentJob) => studentJob.letters)
  @JoinColumn({ name: 'student_job_id' })
  studentJob: StudentJob;

  @Column({ type: 'int', nullable: false })
  keywordMatch: number;

  @Column({ type: 'int', nullable: false })
  meaningMatch: number;

  @Column({ type: 'varchar', nullable: false })
  letter: string;
}
