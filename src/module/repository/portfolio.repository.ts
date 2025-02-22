import { Repository } from 'typeorm';
import { Portfolio } from '../entity/portfolio.entity';

export class PortfolioRepository extends Repository<Portfolio> {}
