import { Repository } from 'typeorm';
import { Feedback } from '../entity/feedback.entity';

export class FeedbackRepository extends Repository<Feedback> {}
