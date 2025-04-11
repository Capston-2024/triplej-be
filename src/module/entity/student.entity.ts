import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
  export class Student {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column({ type: 'varchar', length: 30, nullable: false })
  firstName: string;

  @Column({ type: 'varchar', length: 30, nullable: false })
  lastName: string;

  @Column({ type: 'varchar', length: 30, nullable: false })
  nationality: string;

  @Column({ type: 'varchar', length: 30, nullable: false })
  language: string;

  @Column({ type: 'varchar', length: 50, nullable: false, unique: true })
  email: string;

  @Column({ type: 'varchar', length: 100, nullable: false })
  password: string;

  @Column({ type: 'varchar', length: 10, nullable: false })
  degree: string;

  @Column({ type: 'varchar', length: 30, nullable: false })
  college: string;

  @Column({ type: 'varchar', length: 50, nullable: false })
  major: string;

  @Column({ type: 'varchar', length: 30, nullable: false })
  visa: string;

  @Column({ type: 'varchar', length: 30, nullable: false })
  topik: string;
}
