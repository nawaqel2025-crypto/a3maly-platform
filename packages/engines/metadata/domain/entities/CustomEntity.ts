import { AggregateRoot } from '../../../../core/domain/AggregateRoot';

interface CustomEntityProps {
  name: string;
  fields: string[];
}

export class CustomEntity extends AggregateRoot<CustomEntityProps> {
  static create(props: CustomEntityProps, id: string) {
    return new CustomEntity(id, props);
  }
}
