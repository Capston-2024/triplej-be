import {
  Body,
  Controller,
  HttpStatus,
  Post,
  ValidationPipe,
} from '@nestjs/common';
import { AppService } from './app.service';
import { SigninRequest } from './module/dto/signin.dto';
import { Response } from './common/response';
import { JobRequest } from './module/dto/predict.dto';
import { JobDto } from './module/dto/add_job.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('/signin')
  async signIn(@Body(ValidationPipe) signinReq: SigninRequest) {
    return Response.of(
      HttpStatus.OK,
      '회원가입이 완료되었습니다.',
      await this.appService.signIn(signinReq),
    );
  }

  @Post('/jobs')
  async getJobs(@Body(ValidationPipe) userData: JobRequest) {
    return Response.of(
      HttpStatus.OK,
      '채용 공고 목록 조회가 완료되었습니다.',
      await this.appService.getJobs(userData),
    );
  }

  @Post('/job')
  async addJob(@Body(ValidationPipe) jobData: JobDto) {
    return await this.appService.addJob(jobData);
  }
}
