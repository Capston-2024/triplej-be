import { Students } from '../entity/students.entity';

export class SigninRequest {
  readonly name: string;
  readonly nationality: string;
  readonly email: string;
  readonly password: string;
  readonly education: string;
  readonly major: string;
  readonly visa: string;
  readonly topikLevel: string;
  readonly tags: string[];
}

export class SigninResponse {
  readonly name: string;
  readonly email: string;

  constructor(student: Students) {
    this.name = student.name;
    this.email = student.email;
  }
}
