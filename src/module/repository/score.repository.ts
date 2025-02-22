import { Repository } from 'typeorm';
import { Score } from '../entity/score.entity';

export class ScoreRepository extends Repository<Score> {}
