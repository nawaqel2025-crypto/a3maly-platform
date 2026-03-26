import { CreateCompany } from '../use-cases/CreateCompany';
import { CreateCompanyDto } from '../dto/CreateCompanyDto';

export class CompanyService {
  private createCompanyUC = new CreateCompany();

  async createCompany(input: CreateCompanyDto) {
    return await this.createCompanyUC.execute(input);
  }
}
