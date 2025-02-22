import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Post,
  Query,
  ValidationPipe,
} from '@nestjs/common';
import { AppService } from './app.service';
import { ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { ApplyJobRequest } from './module/dto/apply_job.dto';
import { Response } from './common/response';
import { GetApplicationStatusListResponse } from './module/dto/get_application_status_list.dto';

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

  @Post('/jobs/:jobId/like')
  @ApiOperation({ summary: '관심 공고 지정하기' })
  async likeJob(@Param('jobId') jobId: number) {
    // todo - 관심공고 지정하기 API
  }

  @Get('/user-info')
  async getUserInfo() {
    // 회원정보 조회 API
  }

  @Get('/application-status-list')
  @ApiOperation({ summary: '지원 현황 조회하기' })
  @ApiOkResponse({ type: GetApplicationStatusListResponse })
  async getApplicationStatusList(@Query('email') email: string) {
    return Response.of(
      HttpStatus.OK,
      '지원 현황이 조회되었습니다.',
      await this.appService.getApplicationStatusList(email),
    );
  }

  @Get('/job-posting-list')
  async getJobPostingList() {
    // 전체 채용공고 조회 API
    // 관심공고 조회 API 통합 - query string
  }
}
