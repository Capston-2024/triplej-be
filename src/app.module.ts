import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Job } from './module/entity/job.entity';
import { Student } from './module/entity/student.entity';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import * as process from 'process';
import { Company } from './module/entity/company.entity';
import { Letter } from './module/entity/letter.entity';
import { Portfolio } from './module/entity/portfolio.entity';
import { Resume } from './module/entity/resume.entity';
import { Score } from './module/entity/score.entity';
import { StudentJob } from './module/entity/student_job.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: 5432,
      username: process.env.DB_USERNAME,
      database: 'triplej',
      entities: [
        Company,
        Job,
        Letter,
        Portfolio,
        Resume,
        Score,
        Student,
        StudentJob,
      ],
      synchronize: false,
      namingStrategy: new SnakeNamingStrategy(),
    }),
    TypeOrmModule.forFeature([
      Company,
      Job,
      Letter,
      Portfolio,
      Resume,
      Score,
      Student,
      StudentJob,
    ]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
