import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Jobs } from './module/entity/jobs.entity';
import { Students } from './module/entity/students.entity';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import * as process from 'process';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: 5432,
      username: process.env.DB_USERNAME,
      database: process.env.DB_NAME,
      entities: [process.env.DIR_NAME + '/module/entity/*.entity.ts}'],
      synchronize: false,
      namingStrategy: new SnakeNamingStrategy(),
    }),
    TypeOrmModule.forFeature([Jobs, Students]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
