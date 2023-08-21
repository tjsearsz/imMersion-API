import { IQuery } from 'src/interfaces/IQuery.js';
import { Company } from '../entities/company.entity.js';

export default interface ICompanyQuery<P, R> extends IQuery<P, R, Company> {}
