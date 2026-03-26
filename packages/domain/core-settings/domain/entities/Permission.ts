import { Entity } from '../../../../core/domain/Entity';

interface PermissionProps {
  key: string;
  description: string;
}

export class Permission extends Entity<PermissionProps> {
  static create(props: PermissionProps, id: string) {
    return new Permission(id, props);
  }
}
