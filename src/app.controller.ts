import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Post,
  ValidationPipe,
} from '@nestjs/common';
import { AppService } from './app.service';
import { ApiOperation } from '@nestjs/swagger';
import { ApplyJobRequest } from './module/dto/apply_job.dto';
import { Response } from './common/response';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('/login')
  async login() {
    // 로그인 API
  }

  @Post('/sign-up')
  async signUp() {
    // 회원가입 API
  }

  @Post('/job-apply')
  @ApiOperation({ summary: '지원하기' })
  async applyJob(@Body(ValidationPipe) applyJobReq: ApplyJobRequest) {
    return Response.of(
      HttpStatus.OK,
      '지원이 완료되었습니다.',
      await this.appService.applyJob(applyJobReq),
    );
  }

  @Get('/user-info')
  async getUserInfo() {
    // 회원정보 조회 API
  }

  @Get('/application-status-list')
  async getApplicationStatusList() {
    // 지원현황 조회 API
  }

  @Get('/job-posting-list')
  async getJobPostingList() {
    // 전체 채용공고 조회 API
    // 관심공고 조회 API 통합 - query string
  }
}
