import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

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

  @Column({ type: 'array', nullable: false })
  tags: string[];

  @Column({ type: 'varchar', length: 50, nullable: false })
  companyImage: string;

  @Column({ type: 'varchar', length: 100, nullable: false })
  companyInfo: string;
}
