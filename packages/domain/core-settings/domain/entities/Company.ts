export interface CompanyProps {
  name: string;
  country: string;
  currency: string;
}

export class Company {
  private constructor(
    public readonly id: string,
    public props: CompanyProps
  ) {}

  static create(props: CompanyProps, id: string) {
    return new Company(id, props);
  }
}
