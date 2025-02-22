import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Jobs } from './jobs.entity';

@Entity()
export class Companies {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column({ type: 'varchar', length: 30, nullable: false })
  companyName: string;

  @Column({ type: 'varchar', length: 30, nullable: false })
  workerName: string;

  @Column({ type: 'varchar', length: 50, nullable: false, unique: true })
  email: string;

  @Column({ type: 'varchar', length: 30, nullable: false })
  password: string;

  @Column({ type: 'varchar', array: true })
  tags: string[];

  @Column({ type: 'varchar', length: 50, nullable: false })
  companyImage: string;

  @Column({ type: 'varchar', length: 100, nullable: false })
  companyInfo: string;

  @OneToMany(() => Jobs, (jobs) => jobs.company)
  jobs: Jobs[];
}
