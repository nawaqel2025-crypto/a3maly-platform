import { AggregateRoot } from '../../../../core/domain/AggregateRoot';

interface UserProps {
  name: string;
  email: string;
  isActive: boolean;
}

export class User extends AggregateRoot<UserProps> {
  static create(props: UserProps, id: string) {
    return new User(id, props);
  }
}
