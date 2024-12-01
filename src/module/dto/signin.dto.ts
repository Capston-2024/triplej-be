import { Students } from '../entity/students.entity';

export class UserData {
  readonly name: string;
  readonly nationality: string;
  readonly email: string;
  readonly password: string;
  readonly education: string;
  readonly major: string;
  readonly visa: string;
  readonly topik: string;
  readonly interestTags: string;
}
export class SigninRequest {
  readonly userData: UserData;
}

export class SigninResponse {
  readonly name: string;
  readonly email: string;
  readonly nationality: string;
  readonly education: string;
  readonly topik: string;
  readonly work: string;

  constructor(student: Students) {
    this.name = student.name;
    this.email = student.email;
    this.nationality = student.nationality;
    this.education = student.education;
    this.topik = student.topikLevel;
    this.work = student.tags;
  }
}
