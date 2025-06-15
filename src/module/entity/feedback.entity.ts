import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Feedback {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', array: true })
  missing_keywords: string[];

  @Column({ type: 'float', nullable: false })
  similarity: number;

  @Column({ type: 'varchar', nullable: false })
  job: string;

  @Column({ type: 'varchar', nullable: false })
  letter: string;
}
