import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Job } from './module/entity/job.entity';
import { Student } from './module/entity/student.entity';
import { Company } from './module/entity/company.entity';
import { Letter } from './module/entity/letter.entity';
import { Portfolio } from './module/entity/portfolio.entity';
import { Resume } from './module/entity/resume.entity';
import { Score } from './module/entity/score.entity';
import { StudentJob } from './module/entity/student_job.entity';
import { databaseConfig } from './common/database.config';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: [databaseConfig] }),
    TypeOrmModule.forRootAsync({
      imports: undefined,
      useFactory: databaseConfig,
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
