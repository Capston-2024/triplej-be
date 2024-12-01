export class JobRequest {
  readonly nationality: string;
  readonly education: string;
  readonly topik: string;
  readonly interestTags: string;
}

export class PredictRequest {
  readonly nationality: string;
  readonly education: string;
  readonly topik: string;
  readonly work: string;

  constructor(req: JobRequest) {
    this.nationality = req.nationality;
    this.education = req.education;
    this.topik = req.topik;
    this.work = req.interestTags;
  }
}
