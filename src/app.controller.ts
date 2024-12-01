import {
  Body,
  Controller,
  Get,
  HttpStatus,
  ValidationPipe,
} from '@nestjs/common';
import { AppService } from './app.service';
import { SigninRequest } from './module/dto/signin.dto';
import { Response } from './common/response';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/signin')
  async signIn(@Body(ValidationPipe) signinReq: SigninRequest) {
    return Response.of(HttpStatus.OK, await this.appService.signIn(signinReq));
  }

  @Get('/jobs')
  async getJobs() {
    return Response.of(HttpStatus.OK, await this.appService.getJobs());
  }
}
