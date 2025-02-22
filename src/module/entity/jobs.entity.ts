import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Companies } from './companies.entity';

@Entity()
export class Jobs {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => Companies, (company) => company.jobs)
  @JoinColumn({ name: 'company_id' })
  company: Companies;

  @Column({ type: 'varchar', length: 100, nullable: false })
  title: string;

  @Column({ type: 'varchar', array: true })
  works: string[];

  @Column({ type: 'varchar', array: true })
  employments: string[];

  @Column({ type: 'varchar', array: true })
  languages: string[];

  @Column({ type: 'varchar', array: true })
  visas: string[];

  @Column({ type: 'varchar', length: 500, nullable: false })
  jobInfo: string;

  @Column({ type: 'varchar', array: true })
  preferences: string[];
}
