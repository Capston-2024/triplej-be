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
import { GetJobPostingListResponse } from './module/dto/get_job_posting_list.dto';
import { GetUserInfoResponse } from './module/dto/get_user_auth_info.dto';
import { LoginRequest } from './module/dto/login.dto';
import { SignUpRequest } from './module/dto/sing_up.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('/login')
  @ApiOperation({ summary: '로그인하기' })
  async login(@Body(ValidationPipe) loginReq: LoginRequest) {
    return Response.of(
      HttpStatus.OK,
      '로그인에 성공하였습니다.',
      await this.appService.login(loginReq),
    );
  }

  @Post('/sign-up')
  async signUp(@Body(ValidationPipe) signUpReq: SignUpRequest) {
    return Response.of(
      HttpStatus.OK,
      '회원가입에 성공하였습니다.',
      await this.appService.signUp(signUpReq),
    );
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
  @ApiOperation({ summary: '관심 공고 지정/지정해제 하기' })
  async likeJob(@Param('jobId') jobId: number, @Query('email') email: string) {
    return Response.of(
      HttpStatus.OK,
      '관심 공고 지정/지정해제 되었습니다.',
      await this.appService.likeJob(jobId, email),
    );
  }

  @Get('/user-info')
  @ApiOperation({ summary: '회원 정보 조회하기' })
  @ApiOkResponse({ type: GetUserInfoResponse })
  async getUserInfo(@Query('email') email: string) {
    return Response.of(
      HttpStatus.OK,
      '회원 정보가 조회되었습니다.',
      await this.appService.getUserInfo(email),
    );
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
  @ApiOperation({ summary: '채용 공고 조회하기' })
  @ApiOkResponse({ type: GetJobPostingListResponse })
  async getJobPostingList(@Query('email') email: string) {
    return Response.of(
      HttpStatus.OK,
      '채용 공고가 조회되었습니다.',
      await this.appService.getJobPostingList(email),
    );
  }
}
