import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Jobs {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column({ type: 'varchar', length: 30, nullable: false })
  companyName: string;

  @Column({ type: 'varchar', length: 50, nullable: false })
  title: string;

  @Column({ type: 'varchar', array: true })
  tags: string[];

  @Column({ type: 'timestamp', nullable: true })
  endAt: Date;

  @Column({ type: 'varchar', length: 100, nullable: true })
  imgSrc: string; // 회사 이미지 파일

  @Column({ type: 'varchar', length: 100, nullable: false })
  jobDetail: string; // 공고 링크
}
