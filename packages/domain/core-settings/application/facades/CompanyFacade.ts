import { CompanyService } from '../services/CompanyService';
import { CreateCompanyDto } from '../dto/CreateCompanyDto';

export class CompanyFacade {
  private service = new CompanyService();

  async createCompany(input: CreateCompanyDto) {
    return await this.service.createCompany(input);
  }
}
