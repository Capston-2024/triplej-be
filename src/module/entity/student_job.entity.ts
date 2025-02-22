import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Student } from './student.entity';
import { Job } from './job.entity';
import { Score } from './score.entity';
import { Letter } from './letter.entity';
import { Resume } from './resume.entity';

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

  @OneToMany(() => Score, (scores) => scores.studentJob)
  scores: Score[];

  @OneToMany(() => Letter, (letters) => letters.studentJob)
  letters: Letter[];

  @OneToMany(() => Resume, (resumes) => resumes.studentJob)
  resumes: Resume[];
}
