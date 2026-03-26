import { Entity } from '../../../../core/domain/Entity';

interface RoleProps {
  name: string;
  permissions: string[];
}

export class Role extends Entity<RoleProps> {
  static create(props: RoleProps, id: string) {
    return new Role(id, props);
  }
}
