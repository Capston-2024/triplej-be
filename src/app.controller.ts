import { Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';

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
  async applyJob() {
    // 지원하기 API
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
