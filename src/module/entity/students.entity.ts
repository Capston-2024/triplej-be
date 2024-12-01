import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Students {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column({ type: 'varchar', length: 30, nullable: false })
  name: string;

  @Column({ type: 'varchar', length: 30, nullable: false })
  nationality: string;

  @Column({ type: 'varchar', length: 50, nullable: false })
  email: string;

  @Column({ type: 'varchar', length: 30, nullable: false })
  password: string;

  @Column({ type: 'varchar', length: 10, nullable: false })
  education: string;

  @Column({ type: 'varchar', length: 50, nullable: false })
  major: string;

  @Column({ type: 'varchar', length: 30, nullable: false })
  visa: string;

  @Column({ type: 'varchar', length: 30, nullable: false })
  topikLevel: string;

  @Column({ type: 'varchar', array: true })
  tags: string[]; // 관심 태그
}
