import { HttpStatus } from '@nestjs/common';
import { HttpStatusMessage } from './http_status_message';

export class Response<T> {
  private readonly statusCode: number;
  private readonly message: string | object;
  private readonly data?: T;

  private constructor(status: HttpStatus, message?: string, data?: T) {
    this.statusCode = status;
    this.message =
      message || HttpStatusMessage[status] || 'Unknown status code';
    this.data = data;
  }

  static of<T>(status: HttpStatus, message: string, data?: T): Response<T> {
    return new Response<T>(status, message, data);
  }

  static error(status: HttpStatus, message: string) {
    return new Response(status, message);
  }
}
