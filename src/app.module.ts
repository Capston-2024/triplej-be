import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Job } from './module/entity/job.entity';
import { Student } from './module/entity/student.entity';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import * as process from 'process';
import { Company } from './module/entity/company.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: 5432,
      username: process.env.DB_USERNAME,
      database: 'triplej',
      entities: [Job, Student, Company],
      synchronize: false,
      namingStrategy: new SnakeNamingStrategy(),
    }),
    TypeOrmModule.forFeature([Job, Student, Company]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
