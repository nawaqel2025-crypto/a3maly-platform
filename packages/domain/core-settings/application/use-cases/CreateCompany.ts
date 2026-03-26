import { CreateCompanyDto } from '../dto/CreateCompanyDto';
import { Company } from '../../domain/entities/Company';

export class CreateCompany {
  async execute(input: CreateCompanyDto) {
    const company = Company.create({
      name: input.name,
      country: input.country,
      currency: input.currency
    }, crypto.randomUUID());

    return company;
  }
}
