import { Entity } from '../../../../core/domain/Entity';

interface AccountProps {
  code: string;
  name: string;
  type: string;
  isActive: boolean;
}

export class Account extends Entity<AccountProps> {
  static create(props: AccountProps, id: string) {
    return new Account(id, props);
  }
}
