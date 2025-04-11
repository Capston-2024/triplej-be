import { Repository } from 'typeorm';
import { Letter } from '../entity/letter.entity';

export class LetterRepository extends Repository<Letter> {}
